/**
 * Room Service · Kimpton Los Monteros Marbella
 * Google Apps Script endpoint para recibir pedidos desde GitHub Pages,
 * guardarlos en Google Sheets y avisar por Telegram con botones de seguimiento.
 *
 * Flujo Telegram: 👨‍🍳 Marchando en cocina → ✅ Entregado
 * Los botones se procesan por polling cada minuto. Ejecuta instalarBotones() una vez.
 */

const SHEET_ID = '16I8G4hRoGzg_cOeyJTSOxLARGZjvsyeo0t9fWXF-u-A';
const SHEET_NAME = 'Comandas';
const NO_POST_SHEET = 'NoPost';
const TELEGRAM_TOKEN = '8804150274:AAHGt040CVcDQlaBJQi8TMtIx1h5F0vQ8Vw';
const TELEGRAM_CHAT_ID = '-1003567319828';
const COL_STATUS = 19;

const HEADERS = [
  'timestamp',
  'orderId',
  'service',
  'room',
  'guest',
  'pax',
  'payment',
  'cashAmount',
  'orderedBy',
  'source',
  'allergy',
  'allergyDetail',
  'notes',
  'receptionNote',
  'items',
  'subtotal',
  'deliveryCharge',
  'total',
  'status',
];

const ESTADOS = {
  cook: {
    sheet: 'MARCHANDO EN COCINA',
    mark: '👨‍🍳 <b>MARCHANDO EN COCINA</b>',
    next: { text: '✅ Entregado', data: 'done|' },
    color: '#D18F00',
  },
  done: {
    sheet: 'ENTREGADO',
    mark: '✅ <b>ENTREGADO</b>',
    next: null,
    color: '#2E7D32',
  },
};

function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'noPost') {
    return json_({ ok: true, rooms: getNoPostRooms_() });
  }
  return ContentService.createTextOutput('Comandas Room Service activo — Kimpton Los Monteros.');
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    if (payload.callback_query) {
      gestionarBoton_(payload.callback_query);
      return json_({ ok: true });
    }

    const registration = registrarEnSheet_(payload);
    if (!registration.duplicate && TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
      enviarTelegram_(payload, Array.isArray(payload.items) ? payload.items : [], registration.row);
    }

    return json_({
      ok: true,
      duplicate: registration.duplicate,
      orderId: payload.orderId || '',
      row: registration.row,
    });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

// ------------------------------------------------------------
// Botones por polling: ejecutar instalarBotones() una sola vez.
// Quita webhook y crea activador de procesarBotones cada minuto.
// ------------------------------------------------------------
function instalarBotones() {
  Logger.log(telegram_('deleteWebhook', { drop_pending_updates: true }).getContentText());
  ScriptApp.getProjectTriggers().forEach((trigger) => ScriptApp.deleteTrigger(trigger));
  ScriptApp.newTrigger('procesarBotones').timeBased().everyMinutes(1).create();
  Logger.log('Activador creado: procesarBotones cada 1 minuto');
}

function procesarBotones() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return;

  try {
    const props = PropertiesService.getScriptProperties();
    const offset = parseInt(props.getProperty('update_offset') || '0', 10);
    const res = telegram_('getUpdates', {
      offset,
      timeout: 0,
      allowed_updates: ['callback_query'],
    });
    const data = JSON.parse(res.getContentText());
    if (!data.ok) {
      Logger.log(res.getContentText());
      return;
    }
    data.result.forEach((update) => {
      props.setProperty('update_offset', String(update.update_id + 1));
      if (update.callback_query) gestionarBoton_(update.callback_query);
    });
  } finally {
    lock.releaseLock();
  }
}

function gestionarBoton_(q) {
  try {
    const parts = String(q.data || '').split('|');
    const action = parts[0];
    const row = parseInt(parts[1], 10);
    const step = ESTADOS[action];

    if (!step) {
      telegram_('answerCallbackQuery', {
        callback_query_id: q.id,
        text: 'Botón no reconocido',
        show_alert: true,
      });
      return;
    }

    const who = (q.from && (q.from.first_name || q.from.username)) || 'equipo';
    const time = Utilities.formatDate(new Date(), 'Europe/Madrid', 'HH:mm');

    telegram_('answerCallbackQuery', {
      callback_query_id: q.id,
      text: '✔ ' + step.sheet + ' — ' + who,
    });

    const keyboard = step.next
      ? { inline_keyboard: [[{ text: step.next.text, callback_data: step.next.data + row }]] }
      : { inline_keyboard: [] };

    telegram_('editMessageReplyMarkup', {
      chat_id: q.message.chat.id,
      message_id: q.message.message_id,
      reply_markup: keyboard,
    });

    let ref = '';
    let sheet = null;
    if (row > 1) {
      sheet = getOrCreateSheet_();
      const values = sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0];
      ref = values[1] + ' · Hab. ' + values[3];
      const currentStatus = String(values[COL_STATUS - 1] || '');
      if (currentStatus.indexOf(step.sheet) === 0) return;
    }

    telegram_('sendMessage', {
      chat_id: q.message.chat.id,
      text: step.mark + (ref ? '\n🔖 ' + ref : '') + '\n👤 ' + who + ' · ' + time,
      parse_mode: 'HTML',
      reply_to_message_id: q.message.message_id,
    });

    if (sheet && row > 1) {
      const cell = sheet.getRange(row, COL_STATUS);
      cell.setValue(step.sheet + ' — ' + who + ' ' + time);
      cell.setFontWeight('bold').setFontColor(step.color);
    }
  } catch (error) {
    Logger.log('Error en gestionarBoton_: ' + error);
    try {
      telegram_('answerCallbackQuery', {
        callback_query_id: q.id,
        text: '⚠ Error: ' + error,
        show_alert: true,
      });
    } catch (ignored) {}
  }
}

function registrarEnSheet_(payload) {
  const sheet = getOrCreateSheet_();
  const items = Array.isArray(payload.items) ? payload.items : [];
  const orderId = String(payload.orderId || '').trim();
  const duplicateRow = orderId ? findOrderRow_(sheet, orderId) : 0;

  if (duplicateRow) {
    return { row: duplicateRow, duplicate: true };
  }

  sheet.appendRow([
    payload.timestamp || new Date().toISOString(),
    payload.orderId || '',
    payload.service || '',
    payload.room || '',
    payload.guest || '',
    payload.pax || '',
    payload.payment || '',
    payload.cashAmount || '',
    payload.orderedBy || '',
    payload.source || '',
    payload.allergy || '',
    payload.allergyDetail || '',
    payload.notes || '',
    payload.receptionNote || '',
    JSON.stringify(items),
    Number(payload.subtotal || 0),
    Number(payload.deliveryCharge || 0),
    Number(payload.total || 0),
    'Nueva',
  ]);

  const row = sheet.getLastRow();
  sheet.getRange(row, COL_STATUS).setFontWeight('bold').setFontColor('#C62828');
  if (payload.allergy === 'Sí') {
    sheet.getRange(row, 11, 1, 2).setBackground('#f8c8c8').setFontWeight('bold');
  }
  return { row, duplicate: false };
}

function findOrderRow_(sheet, orderId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const found = sheet
    .getRange(2, 2, lastRow - 1, 1)
    .createTextFinder(orderId)
    .matchEntireCell(true)
    .findNext();
  return found ? found.getRow() : 0;
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

function getNoPostRooms_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(NO_POST_SHEET);
  if (!sheet) return [];
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet
    .getRange(2, 1, lastRow - 1, 1)
    .getValues()
    .flat()
    .map((value) => String(value).trim())
    .filter(Boolean);
}

function enviarTelegram_(payload, items, row) {
  const lines = items.map((item) => {
    const variant = item.variant ? `\n     <i>${escapeHtml_(item.variant)}</i>` : '';
    return `▪️ ${item.qty} × <b>${escapeHtml_(item.name)}</b>${variant} — ${formatEuro_(item.total)}`;
  });

  const text = [
    `🛎️ <b>NUEVA COMANDA ROOM SERVICE</b>`,
    '━━━━━━━━━━━━━━━━━━━',
    `🔖 <b>${escapeHtml_(payload.orderId || '—')}</b>`,
    `🚪 Habitación: <b>${escapeHtml_(payload.room || '—')}</b>`,
    `👤 Huésped: ${escapeHtml_(payload.guest || '—')} (${escapeHtml_(payload.pax || '—')} pax)`,
    `🕐 Servicio: ${escapeHtml_(payload.service || '—')}`,
    '━━━━━━━━━━━━━━━━━━━',
    ...lines,
    '━━━━━━━━━━━━━━━━━━━',
    `Subtotal: ${formatEuro_(payload.subtotal)}`,
    `Delivery: ${formatEuro_(payload.deliveryCharge)}`,
    `💶 <b>TOTAL: ${formatEuro_(payload.total)}</b>`,
    payload.payment ? `💳 Pago: <b>${escapeHtml_(payload.payment)}</b>` : null,
    payload.payment === 'Efectivo a la entrega' && payload.cashAmount
      ? `💵 Paga con: <b>${escapeHtml_(payload.cashAmount)}</b>`
      : null,
    payload.orderedBy ? `🧾 Pedido realizado por: <b>${escapeHtml_(payload.orderedBy)}</b>` : null,
    payload.allergy === 'Sí'
      ? `\n🚨 <b>ALERGIA/INTOLERANCIA: ${escapeHtml_(payload.allergyDetail || 'Sí')}</b>\nCoordinar con cocina antes de elaborar.`
      : '\n✅ Sin alergias declaradas',
    payload.notes ? `\n📝 Observaciones: ${escapeHtml_(payload.notes)}` : null,
    payload.receptionNote ? `\n📞 Nota de recepción: ${escapeHtml_(payload.receptionNote)}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  telegram_('sendMessage', {
    chat_id: TELEGRAM_CHAT_ID,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [[{ text: '👨‍🍳 Marchando en cocina', callback_data: 'cook|' + row }]],
    },
  });
}

function telegram_(method, payload) {
  return UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/' + method, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
}

function escapeHtml_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatEuro_(value) {
  return `${Number(value || 0).toFixed(2).replace('.', ',')} €`;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

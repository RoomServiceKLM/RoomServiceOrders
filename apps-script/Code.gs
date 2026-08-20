/**
 * Room Service · Kimpton Los Monteros Marbella
 * Google Apps Script endpoint para recibir pedidos desde GitHub Pages,
 * guardarlos en Google Sheets y avisar por Telegram con botones de seguimiento.
 *
 * Flujo Telegram: 👨‍🍳 Marchando en cocina → ✅ Entregado
 * Cada cambio de estado edita el mensaje original y actualiza sus botones.
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

const KIDS_ITEM_IDS = [
  'k-burger',
  'k-pizza',
  'k-chicken',
  'k-bolognese',
  'k-napoletana',
  'k-chickenbreast',
  'k-salmon',
  'k-tomato',
];

const ESTADOS = {
  cook: {
    sheet: 'MARCHANDO EN COCINA',
    next: { text: '✅ Entregado', data: 'done|' },
    color: '#D18F00',
  },
  done: {
    sheet: 'ENTREGADO',
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

    payload.items = normalizarItems_(payload.items);
    const registration = registrarEnSheet_(payload);
    if (!registration.duplicate && TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
      payload.status = 'Nueva';
      enviarTelegram_(payload, payload.items, registration.row);
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

    if (!step || !q.message || !q.message.chat || !q.message.message_id) {
      telegram_('answerCallbackQuery', {
        callback_query_id: q.id,
        text: 'Botón no reconocido',
        show_alert: true,
      });
      return;
    }

    const sheet = getOrCreateSheet_();
    if (!row || row < 2 || row > sheet.getLastRow()) {
      telegram_('answerCallbackQuery', {
        callback_query_id: q.id,
        text: 'No se ha encontrado la comanda en Sheets',
        show_alert: true,
      });
      return;
    }

    const payload = payloadDesdeFila_(sheet, row);
    payload.items = normalizarItems_(payload.items);
    const current = estadoActual_(payload.status);

    if (action === 'cook' && current !== 'new') {
      telegram_('answerCallbackQuery', {
        callback_query_id: q.id,
        text: current === 'done' ? 'Esta comanda ya está entregada' : 'Esta comanda ya está marchando en cocina',
        show_alert: true,
      });
      return;
    }

    if (action === 'done' && current !== 'cook') {
      telegram_('answerCallbackQuery', {
        callback_query_id: q.id,
        text: current === 'done' ? 'Esta comanda ya está entregada' : 'Primero marca Marchando en cocina',
        show_alert: true,
      });
      return;
    }

    const who = (q.from && (q.from.first_name || q.from.username)) || 'equipo';
    const time = Utilities.formatDate(new Date(), 'Europe/Madrid', 'HH:mm');
    const statusText = step.sheet + ' — ' + who + ' ' + time;

    const cell = sheet.getRange(row, COL_STATUS);
    cell.setValue(statusText);
    cell.setFontWeight('bold').setFontColor(step.color);
    payload.status = statusText;

    const keyboard = step.next
      ? { inline_keyboard: [[{ text: step.next.text, callback_data: step.next.data + row }]] }
      : { inline_keyboard: [] };

    const editResponse = telegram_('editMessageText', {
      chat_id: q.message.chat.id,
      message_id: q.message.message_id,
      text: construirMensajeTelegram_(payload, payload.items),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: keyboard,
    });
    const editData = JSON.parse(editResponse.getContentText());
    if (!editData.ok) throw new Error(editData.description || 'Telegram no pudo editar el mensaje');

    telegram_('answerCallbackQuery', {
      callback_query_id: q.id,
      text: '✔ ' + step.sheet,
    });
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

function estadoActual_(status) {
  const value = String(status || '').toUpperCase();
  if (value.indexOf('ENTREGADO') === 0) return 'done';
  if (value.indexOf('MARCHANDO EN COCINA') === 0) return 'cook';
  return 'new';
}

function payloadDesdeFila_(sheet, row) {
  const values = sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0];
  let items = [];
  try {
    items = JSON.parse(values[14] || '[]');
  } catch (error) {
    items = [];
  }

  return {
    timestamp: values[0],
    orderId: values[1],
    service: values[2],
    room: values[3],
    guest: values[4],
    pax: values[5],
    payment: values[6],
    cashAmount: values[7],
    orderedBy: values[8],
    source: values[9],
    allergy: values[10],
    allergyDetail: values[11],
    notes: values[12],
    receptionNote: values[13],
    items,
    subtotal: values[15],
    deliveryCharge: values[16],
    total: values[17],
    status: values[18],
  };
}

function normalizarItems_(items) {
  if (!Array.isArray(items)) return [];
  return items.map((item) => {
    const normalized = {};
    Object.keys(item || {}).forEach((key) => {
      normalized[key] = item[key];
    });
    const isKids =
      normalized.category === 'kids' ||
      normalized.kids === true ||
      KIDS_ITEM_IDS.indexOf(String(normalized.id || '')) !== -1;
    const name = String(normalized.name || '');
    if (isKids) {
      normalized.category = 'kids';
      if (name && !/ kids$/i.test(name)) normalized.name = name + ' Kids';
    }
    return normalized;
  });
}

function registrarEnSheet_(payload) {
  const sheet = getOrCreateSheet_();
  const items = normalizarItems_(payload.items);
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
  if (esNoPost_(payload.room)) {
    sheet.getRange(row, 4).setBackground('#f8c8c8').setFontWeight('bold');
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

function normalizeRoom_(value) {
  const clean = String(value || '').trim().toLowerCase();
  return /^\d+$/.test(clean) ? String(parseInt(clean, 10)) : clean;
}

function esNoPost_(room) {
  const normalized = normalizeRoom_(room);
  return normalized ? getNoPostRooms_().map(normalizeRoom_).indexOf(normalized) !== -1 : false;
}

function construirMensajeTelegram_(payload, items) {
  const lines = normalizarItems_(items).map((item) => {
    const variant = item.variant ? `\n     <i>${escapeHtml_(item.variant)}</i>` : '';
    return `▪️ ${item.qty} × <b>${escapeHtml_(item.name)}</b>${variant} — ${formatEuro_(item.total)}`;
  });

  const status = String(payload.status || 'Nueva');
  const noPost = esNoPost_(payload.room);

  return [
    `🛎️ <b>NUEVA COMANDA ROOM SERVICE</b>`,
    '━━━━━━━━━━━━━━━━━━━',
    `🔖 <b>${escapeHtml_(payload.orderId || '—')}</b>`,
    `🚪 Habitación: <b>${escapeHtml_(payload.room || '—')}</b>`,
    noPost ? `🚨🚨 <b>CLIENTE NO POST — NO CARGAR A HABITACIÓN</b> 🚨🚨\n⚠️ <b>Cobrar con tarjeta o efectivo a la entrega.</b>` : null,
    `👤 Huésped: ${escapeHtml_(payload.guest || '—')} (${escapeHtml_(payload.pax || '—')} pax)`,
    `🕐 Servicio: ${escapeHtml_(payload.service || '—')}`,
    `📌 <b>Estado: ${escapeHtml_(status)}</b>`,
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
  ]
    .filter(Boolean)
    .join('\n');
}

function enviarTelegram_(payload, items, row) {
  telegram_('sendMessage', {
    chat_id: TELEGRAM_CHAT_ID,
    text: construirMensajeTelegram_(payload, items),
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

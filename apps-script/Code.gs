/**
 * Room Service · Kimpton Los Monteros Marbella
 * Google Apps Script endpoint para recibir pedidos desde GitHub Pages,
 * guardarlos en Google Sheets y avisar opcionalmente por Telegram.
 *
 * Configura SHEET_ID y, si quieres Telegram, TELEGRAM_TOKEN + TELEGRAM_CHAT_ID.
 */

const SHEET_ID = '16I8G4hRoGzg_cOeyJTSOxLARGZjvsyeo0t9fWXF-u-A';
const SHEET_NAME = 'Comandas';
const TELEGRAM_TOKEN = ''; // Opcional: token del bot
const TELEGRAM_CHAT_ID = ''; // Opcional: chat_id del grupo/canal

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
    const payload = JSON.parse(e.postData.contents || '{}');
    const sheet = getOrCreateSheet_();
    const items = Array.isArray(payload.items) ? payload.items : [];

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

    if (TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
      sendTelegram_(payload, items);
    }

    return json_({ ok: true, orderId: payload.orderId || '' });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
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
  const sheet = spreadsheet.getSheetByName('NoPost');
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

function sendTelegram_(payload, items) {
  const lines = items.map((item) => {
    const variant = item.variant ? ` (${item.variant})` : '';
    return `• ${item.qty} × ${item.name}${variant} — ${formatEuro_(item.total)}`;
  });

  const text = [
    `🛎️ NUEVA COMANDA ${payload.orderId || ''}`,
    `Servicio: ${payload.service || '—'}`,
    `Habitación: ${payload.room || '—'}`,
    `Huésped: ${payload.guest || '—'} · Personas: ${payload.pax || '—'}`,
    `Pago: ${payload.payment || '—'}`,
    payload.payment === 'Efectivo a la entrega' && payload.cashAmount ? `Paga con: ${payload.cashAmount}` : null,
    `Alergias: ${payload.allergy || '—'}${payload.allergyDetail ? ` · ${payload.allergyDetail}` : ''}`,
    payload.notes ? `Notas: ${payload.notes}` : null,
    '',
    ...lines,
    '',
    `TOTAL: ${formatEuro_(payload.total)}`,
  ]
    .filter(Boolean)
    .join('\n');

  UrlFetchApp.fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      disable_web_page_preview: true,
    }),
    muteHttpExceptions: true,
  });
}

function formatEuro_(value) {
  return `${Number(value || 0).toFixed(2).replace('.', ',')} €`;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

# Room Service · Kimpton Los Monteros Marbella

Versión para clientes del sistema de comandas, preparada para funcionar con **GitHub Pages + Google Apps Script + Google Sheets**.

## Qué incluye

- Carta completa con buscador, categorías, variantes, alérgenos y suplementos.
- Selector de idioma ES/EN para la interfaz.
- Bloqueo de pedidos fuera de horario; Smoothies y cócteles/aperitivos indicados solo de 09:00 a 01:00.
- Carrito con cantidades, notas, alergias obligatorias, nombre y personas obligatorios.
- Cargo de entrega automático de 6 € en todos los pedidos.
- Envío del pedido a Google Apps Script.
- Registro de cada pedido en Google Sheets.
- Aviso opcional por Telegram si configuras bot y chat.

## 1. Google Sheets

1. Crea una hoja en Google Sheets, por ejemplo `Room Service Comandas`.
2. Opcional: crea una pestaña llamada `Comandas`. Si no existe, el script la crea sola.
3. Copia el ID del Sheet desde la URL:
   `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`

## 2. Google Apps Script

1. En el Sheet: **Extensiones → Apps Script**.
2. Borra el contenido y pega el código de `apps-script/Code.gs`.
3. En `Code.gs`, cambia:
   - `SHEET_ID` por el ID de tu Sheet.
   - Opcional Telegram: `TELEGRAM_TOKEN` y `TELEGRAM_CHAT_ID`.
4. Guarda y pulsa **Implementar → Nueva implementación**.
5. Tipo: **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier persona**.
6. Copia la URL final que termina en `/exec`.

## 3. Configurar la web

Edita `public/config.js` y pega la URL `/exec`:

```js
window.ROOM_SERVICE_WEBAPP_URL = 'https://script.google.com/macros/s/TU_URL/exec';
```

### Bloqueo de cargo a habitación (No Post)

1. En el mismo Google Sheet, crea una pestaña llamada `NoPost`.
2. En la celda A1 escribe `room`.
3. Desde A2 hacia abajo, pega cada día las habitaciones sin cargo a habitación.
4. La web consulta `TU_URL/exec?action=noPost` y desactiva «Cargo a la habitación» para esas habitaciones.

Si no usas Sheets para esto, también puedes poner habitaciones manualmente en `public/config.js`:

```js
window.ROOM_SERVICE_NO_POST = ['214', '318'];
```

### Pago en efectivo con cambio

Cuando el huésped elige «Efectivo a la entrega», la web pide «¿Con cuánto vas a pagar?» y valida que el importe cubra el total. Ese dato se guarda en la columna `cashAmount` y se envía también por Telegram.

## 4. Publicar en GitHub Pages

### Opción recomendada: GitHub Actions

1. Sube este proyecto a un repo, por ejemplo `Pedidos-RS`.
2. En GitHub: **Settings → Pages → Source → GitHub Actions**.
3. El workflow `.github/workflows/deploy.yml` compila y publica automáticamente la rama `main`.

La web quedará en:

```txt
https://TU-USUARIO.github.io/Pedidos-RS/
```

### Opción manual

Si prefieres subir solo el estático:

```bash
npm install
npm run build
```

Sube el contenido de `dist/` al repo y activa Pages desde esa carpeta/rama.

## Datos que se guardan en Sheets

Cada pedido guarda: fecha, orderId, servicio, habitación, huésped, personas, pago, importe en efectivo si aplica, origen, alergias, detalle de alergias, notas, items en JSON, subtotal, cargo de entrega, total y estado.

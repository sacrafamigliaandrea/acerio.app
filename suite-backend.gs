/**
 * ============================================================
 *  BACKEND SUITE — Acerio / Acerionet / AndreaCerioli
 * ============================================================
 *  Archivia l'INTERO stato della Suite (suite.html) su un Google Sheet,
 *  così i tre portali che puntano a questo stesso script condividono i dati:
 *  una modifica fatta su un portale è visibile (al ricaricamento) sugli altri.
 *
 *  Il dato salvato è l'"envelope" cifrato (AES-256-GCM) che suite.html
 *  produce: questo script NON vede mai i dati in chiaro, fa solo da cassetta.
 *
 *  Protocollo (compatibile con suite.html così com'è):
 *    POST  body JSON {action:"save", token:"…", data:"<envelope>"} -> {ok:true}
 *    POST  body JSON {action:"load", token:"…"}                    -> {ok:true, data:"<envelope>"}
 *  Il token (SYNC_TOKEN qui sotto) deve combaciare con quello in suite.html:
 *  blocca i save/load anonimi di chi conosce solo l'URL. NB: non è un segreto
 *  crittografico (vive anche nel client), ma alza l'asticella contro gli abusi.
 *
 *  Le richieste arrivano con Content-Type "text/plain": è una "simple request",
 *  quindi NON scatta il preflight CORS e funziona da tutti e tre i domini.
 *
 *  ---- INSTALLAZIONE (vedi anche le istruzioni passo-passo a chat) ----
 *  1. Crea un NUOVO Google Sheet dedicato alla Suite.
 *  2. Estensioni > Apps Script: incolla TUTTO questo file (sostituendo il codice esistente).
 *  3. Distribuisci > Nuova distribuzione > Tipo: App web
 *       - Esegui come: Me stesso
 *       - Chi ha accesso: Chiunque
 *  4. Copia l'URL che termina con /exec e incollalo nel campo
 *     "URL Apps Script …/exec" della Suite, su ciascuno dei tre portali.
 * ============================================================
 */

var SHEET_NAME = 'SUITE_DATA';   // tab dedicata, creata in automatico
var CHUNK = 40000;               // caratteri per cella (limite Sheets ~50k): blob diviso in chunk
var SYNC_TOKEN = 'sk_acerio_sync_7Qx2Lp9Vd4Rn8Tz'; // DEVE combaciare con SYNC_TOKEN in suite.html

/* --- Foglio dedicato (creato se manca) --- */
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.getRange('A1').setValue('updatedAt');
    sh.getRange('B1').setValue('data (envelope cifrato della Suite — non modificare a mano)');
    sh.setFrozenRows(1);
  }
  return sh;
}

/* --- Lettura: riassembla i chunk dalla colonna B (B2:B...) --- */
function readData_(sh) {
  var last = sh.getLastRow();
  if (last < 2) return '';
  var vals = sh.getRange(2, 2, last - 1, 1).getValues();
  var s = '';
  for (var i = 0; i < vals.length; i++) s += vals[i][0];
  return s;
}

/* --- Scrittura: pulisce i vecchi chunk e riscrive il blob suddiviso --- */
function writeData_(sh, data) {
  var last = sh.getLastRow();
  if (last >= 2) sh.getRange(2, 1, last - 1, 2).clearContent();
  var str = String(data == null ? '' : data);
  var rows = [];
  if (str.length === 0) {
    rows.push([new Date(), '']);
  } else {
    for (var i = 0; i < str.length; i += CHUNK) {
      rows.push([i === 0 ? new Date() : '', str.substring(i, i + CHUNK)]);
    }
  }
  sh.getRange(2, 1, rows.length, 2).setValues(rows);
}

/* --- Output JSON --- */
function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* --- Logica con lock (evita scritture concorrenti corrotte) --- */
function handle_(action, data) {
  var lock = LockService.getScriptLock();
  try { lock.waitLock(20000); } catch (e) { return json_({ ok: false, error: 'busy' }); }
  try {
    var sh = getSheet_();
    if (action === 'save') { writeData_(sh, data); return json_({ ok: true }); }
    if (action === 'load') { return json_({ ok: true, data: readData_(sh) }); }
    return json_({ ok: true, status: 'ready' }); // ping/diagnostica
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* --- POST: usato dalla Suite per save/load --- */
function doPost(e) {
  var action = '', data = '', token = '';
  try {
    var body = (e && e.postData && e.postData.contents) ? JSON.parse(e.postData.contents) : {};
    action = body.action || '';
    data = body.data;
    token = body.token || '';
  } catch (err) {
    return json_({ ok: false, error: 'JSON non valido: ' + err });
  }
  // I save/load richiedono il token: blocca le scritture/letture anonime.
  if ((action === 'save' || action === 'load') && token !== SYNC_TOKEN) {
    return json_({ ok: false, error: 'unauthorized' });
  }
  return handle_(action, data);
}

/* --- GET: diagnostica nel browser e load opzionale (anche JSONP con &callback=) --- */
function doGet(e) {
  var p = (e && e.parameter) || {};
  // load via GET solo col token valido; altrimenti resta una semplice diagnostica.
  var wantLoad = (p.action === 'load') && (p.token === SYNC_TOKEN);
  var out = handle_(wantLoad ? 'load' : 'ping', null);
  if (p.callback) {
    return ContentService
      .createTextOutput(p.callback + '(' + out.getContent() + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return out;
}

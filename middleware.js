// =============================================================
// Vercel Edge Middleware — Calendario portale Andrea Cerioli
// Apertura: Lun–Ven 8:00–16:00, fuso Europe/Rome (gestisce DST)
// Chiusura estiva: dal 5 giugno (incluso) al 13 settembre (incluso)
// Riapertura: 14 settembre
//
// GUARDIA HOSTNAME: il blocco orario si attiva solo sui deploy
// elencati in HOSTNAMES_CON_BLOCCO_ORARIO. Sugli altri progetti
// Vercel collegati allo stesso repo il middleware esce subito e
// l'accesso resta libero h24, festivi e vacanze incluse.
// =============================================================

// ─── CONFIG HOSTNAME ──────────────────────────────────────────
// Aggiungi/rimuovi domini qui per attivare/disattivare il blocco.
// - acerio.vercel.app           → studenti production (blocco ATTIVO)
// - acerionet.vercel.app        → studenti dev/prove (blocco DISATTIVO)
// - andreacerioli-ad.vercel.app → docenti (blocco DISATTIVO)
const HOSTNAMES_CON_BLOCCO_ORARIO = ['acerio.vercel.app'];
// ──────────────────────────────────────────────────────────────

export const config = {
  matcher: '/((?!chiuso\\.html|favicon\\.ico|robots\\.txt|_vercel|api).*)',
};

export default function middleware(request) {
  // Guardia hostname: bypass silenzioso per i deploy non interessati
  const host = request.headers.get('host') || '';
  if (!HOSTNAMES_CON_BLOCCO_ORARIO.includes(host)) return;

  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Rome',
    weekday: 'short',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find(p => p.type === 'weekday').value; // 'Mon'..'Sun'
  const month = parseInt(parts.find(p => p.type === 'month').value, 10);
  const day = parseInt(parts.find(p => p.type === 'day').value, 10);
  let hour = parseInt(parts.find(p => p.type === 'hour').value, 10);
  // Normalizza il caso "24" che alcune implementazioni di Intl
  // restituiscono per mezzanotte (bug noto, dipende dal runtime)
  if (hour === 24) hour = 0;

  // Chiusura estiva: 5 giugno → 13 settembre (incluso)
  const isEstate =
    (month === 6 && day >= 5) ||
    month === 7 ||
    month === 8 ||
    (month === 9 && day <= 13);

  // Apertura giornaliera: Lun–Ven 8:00–16:00 (8:00 incluso, 16:00 escluso)
  const giorniScuola = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const isGiornoScuola = giorniScuola.includes(weekday);
  const isOraScuola = hour >= 8 && hour < 16;

  const aperto = !isEstate && isGiornoScuola && isOraScuola;

  if (aperto) {
    // Lascia passare la richiesta al routing normale.
    // NB: la cache buster sulla risposta normale non è strettamente necessaria
    // perché il vero problema è la cache del redirect, non della home.
    return;
  }

  // Redirect 302 (NON 307: il 307 viene cachato in modo aggressivo dai browser)
  // alla cartolina con cache totalmente disabilitata
  const url = new URL('/chiuso.html', request.url);
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

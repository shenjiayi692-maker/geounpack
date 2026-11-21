// Anonymous usage counter (Cloudflare Pages Function + D1, binding "DB").
// Stores only daily totals: day, site, page path, event name and a short category such as
// an output format or an error type. No IP address, file name, file content or cookie is
// stored, and nothing can identify a visitor.
const SITES = {
  'geounpack.com': ['engine_fail', 'open_ok', 'open_fail', 'preview_fail', 'export_ok', 'export_fail', 'crash'],
  'openolder.com': ['analyze_ok', 'analyze_fail', 'convert_ok', 'convert_fail', 'als_ok', 'als_fail', 'als_convert_ok', 'als_convert_fail'],
};
const clean = (s, max) => String(s || '').toLowerCase().replace(/[^a-z0-9_.:/-]+/g, '').slice(0, max);

export async function onRequestPost({ request, env }) {
  const host = new URL(request.url).hostname.replace(/^www\./, '');
  const events = SITES[host];
  // only count requests made by our own pages
  const origin = request.headers.get('origin') || request.headers.get('referer') || '';
  let fromHost = '';
  try { fromHost = new URL(origin).hostname.replace(/^www\./, ''); } catch (_) { /* ignore */ }
  if (!events || fromHost !== host || !env.DB) return new Response(null, { status: 204 });
  let body;
  try { body = JSON.parse(await request.text()); } catch (_) { return new Response(null, { status: 204 }); }
  const event = clean(body.e, 24);
  if (!events.includes(event)) return new Response(null, { status: 204 });
  const page = clean(body.p, 60) || '/';
  const detail = clean(body.d, 40);
  const day = new Date().toISOString().slice(0, 10);
  await env.DB.prepare(
    'INSERT INTO counts (day, site, page, event, detail, n) VALUES (?, ?, ?, ?, ?, 1) ' +
    'ON CONFLICT (day, site, page, event, detail) DO UPDATE SET n = n + 1'
  ).bind(day, host, page, event, detail).run();
  return new Response(null, { status: 204 });
}

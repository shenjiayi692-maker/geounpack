// Static site generator for GeoUnpack: renders every converter page from src/pages.json
// and copies the WebAssembly libraries into dist/vendor.
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const NOINDEX = process.env.NOINDEX === '1'; // preview deployments: keep out of search engines
const SITE = (process.env.SITE_URL || 'https://geounpack.com').replace(/\/$/, '');
const dist = path.join(root, 'dist');
const src = path.join(root, 'src');

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pages = JSON.parse(fs.readFileSync(path.join(src, 'pages.json'), 'utf8'));
const tpl = fs.readFileSync(path.join(src, 'template.html'), 'utf8');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, 'vendor'), { recursive: true });

// vendor files
const nm = path.join(root, 'node_modules');
const vendor = [
  ['7z-wasm/7zz.umd.js', '7zz.umd.js'],
  ['7z-wasm/7zz.wasm', '7zz.wasm'],
  ['leaflet/dist/leaflet.js', 'leaflet.js'],
  ['leaflet/dist/leaflet.css', 'leaflet.css'],
  ['fflate/umd/index.js', 'fflate.js'],
  ['@tmcw/togeojson/dist/togeojson.umd.js', 'togeojson.js'],
];
const LOCAL_GDAL = process.env.LOCAL_GDAL === '1';
if (LOCAL_GDAL) {
  // for offline testing only; these files are too big for Cloudflare Pages
  for (const f of ['gdal3.js', 'gdal3WebAssembly.wasm', 'gdal3WebAssembly.data']) vendor.push([`gdal3.js/dist/package/${f}`, f]);
}
for (const [from, to] of vendor) fs.copyFileSync(path.join(nm, from), path.join(dist, 'vendor', to));
fs.cpSync(path.join(nm, 'leaflet/dist/images'), path.join(dist, 'vendor/images'), { recursive: true });
for (const f of ['app.js', 'worker.js', 'styles.css']) fs.copyFileSync(path.join(src, f), path.join(dist, f));
// worker.js is cached for an hour (_headers): give its URL a content hash so a new app.js never talks to an old worker
const workerHash = crypto.createHash('sha256').update(fs.readFileSync(path.join(src, 'worker.js'))).digest('hex').slice(0, 10);
const appJs = fs.readFileSync(path.join(dist, 'app.js'), 'utf8');
if (!appJs.includes("new Worker('/worker.js'")) throw new Error('build: worker URL not found in app.js');
fs.writeFileSync(path.join(dist, 'app.js'), appJs.replace("new Worker('/worker.js'", `new Worker('/worker.js?v=${workerHash}'`));
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });

// Date the page content last really changed (per page: "updated" in pages.json / prose.json).
// Do not use the build date: a sitemap whose lastmod changes on every deploy gets ignored.
const CONTENT_UPDATED = '2026-11-13';
// Search results cut titles at about 60 characters: drop the brand suffix when it would not fit anyway.
const fitTitle = (t) => (t.length > 60 ? t.replace(/ \| GeoUnpack$/, '') : t);
// plain text with `code` spans
const rich = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
function listItem(item) {
  if (typeof item === 'string') return rich(item);
  return `${rich(item.text)} <a href="${esc(item.href)}">${esc(item.label)}</a>`;
}
const OG_IMAGE = `${SITE}/og.png`;
const url = (slug) => `${SITE}/${slug ? slug + '/' : ''}`;
const nav = `<a href="/lpk-to-shapefile/">LPK</a><a href="/mpk-to-shapefile/">MPK</a><a href="/gdb-to-shapefile/">GDB</a><a href="/kml-to-shapefile/">KML</a><a href="/#formats">Formats</a>`;
const FROM_LABEL = { ANY: 'Esri file', LPK: 'LPK', LPKX: 'LPKX', MPK: 'MPK', MPKX: 'MPKX', GDB: 'GDB (.zip)', KML: 'KML / KMZ', KMZ: 'KMZ', SHP: 'Shapefile' };
// what the drop box says it accepts (every page accepts every format; this just matches the page)
const DROP_META = { KML: '.kml .kmz', KMZ: '.kmz .kml', SHP: '.shp + .shx + .dbf + .prj, or a .zip of them' };
const DROP_DEFAULT = '.lpk .lpkx .mpk .mpkx .gdb.zip';

for (const p of pages) {
  const faqHtml = p.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n');
  const steps = p.steps.map((s) => `<li>${esc(s)}</li>`).join('');
  const related = pages.filter((o) => o.slug !== p.slug && o.slug).map((o) => `<a href="/${o.slug}/">${esc(o.h1.replace(/ Converter$/, ''))}</a>`).join('');
  let compare = '';
  if (p.compare) {
    const [head, ...rows] = p.compare;
    compare = `<section><h2>Comparison</h2><div class="table-wrap"><table class="compare"><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${esc(c)}</td>` : `<th>${esc(c)}</th>`)).join('')}</tr>`).join('')}</tbody></table></div></section>`;
  }
  const body = (p.body || []).map((s) => `<section><h2>${esc(s.h2)}</h2>${s.p.map((t) => `<p>${rich(t)}</p>`).join('')}${s.list ? `<ul>${s.list.map((t) => `<li>${listItem(t)}</li>`).join('')}</ul>` : ''}</section>`).join('\n  ');
  const jsonld = JSON.stringify([
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'GeoUnpack',
      applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any (web browser)',
      url: url(p.slug), description: p.description, image: OG_IMAGE,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${SITE}/#org` },
    },
    ...(p.slug ? [] : [
      { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE}/#org`, name: 'GeoUnpack', url: `${SITE}/`, logo: `${SITE}/favicon.svg`, email: 'hello@geounpack.com', sameAs: ['https://github.com/shenjiayi692-maker'] },
      { '@context': 'https://schema.org', '@type': 'WebSite', name: 'GeoUnpack', url: `${SITE}/`, publisher: { '@id': `${SITE}/#org` } },
    ]),
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo', name: p.h1,
      step: p.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })),
    },
  ]).replace(/</g, '\\u003c');
  const html = tpl
    .replaceAll('{{title}}', esc(fitTitle(p.title)))
    .replace('{{ogimage}}', OG_IMAGE)
    .replace('{{example}}', p.slug === 'lpk-to-shapefile'
      ? '<div id="survey-example"><p><button type="button" id="try-survey">Try the two-layer example</button> · <a id="survey-download" href="/examples/survey.lpk" download>Download the two-layer survey example</a> (CC0)</p><p>Preview stations or routes and click a feature. In the Shapefile export, <code>inspection_label</code> becomes <code>inspection</code> and <code>inspection_status</code> becomes <code>inspecti_1</code>. This synthetic package models the embedded geodatabase only.</p></div>'
      : '')
    .replace('{{body}}', body)
    .replaceAll('{{description}}', esc(p.description))
    .replaceAll('{{canonical}}', url(p.slug))
    .replace('{{jsonld}}', jsonld)
        .replace('{{h1}}', esc(p.h1))
    .replace('{{subtitle}}', esc(p.subtitle || ''))
    .replace('{{dropMeta}}', esc(DROP_META[p.from] || DROP_DEFAULT))
    .replace('{{fromLabel}}', esc(FROM_LABEL[p.from] || 'LPK / MPK / GDB'))
    .replace('{{lead}}', esc(p.lead))
    .replace('{{steps}}', steps)
    .replace('{{compare}}', compare)
    .replace('{{faq}}', faqHtml)
    .replace('{{related}}', related)
    .replace('<meta name="viewport"', NOINDEX ? '<meta name="robots" content="noindex, nofollow">\n<meta name="viewport"' : '<meta name="viewport"')
    .replace('{{config}}', JSON.stringify({ defaultFormat: p.defaultFormat, localGdal: LOCAL_GDAL }));
  const dir = path.join(dist, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

// simple prose pages
const prose = JSON.parse(fs.readFileSync(path.join(src, 'prose.json'), 'utf8'));
for (const p of prose) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">${NOINDEX ? '<meta name="robots" content="noindex, nofollow">' : ''}<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)} | GeoUnpack</title><meta name="description" content="${esc(p.description)}"><link rel="canonical" href="${url(p.slug)}">
<meta property="og:title" content="${esc(p.title)} | GeoUnpack"><meta property="og:description" content="${esc(p.description)}"><meta property="og:type" content="website"><meta property="og:url" content="${url(p.slug)}"><meta property="og:site_name" content="GeoUnpack"><meta property="og:image" content="${OG_IMAGE}"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css"></head><body>
<header class="topbar"><div class="wrap topbar-in"><a class="brand" href="/"><img src="/favicon.svg" alt="" width="22" height="22">GeoUnpack</a><nav class="topnav">${nav}</nav></div></header>
<main class="wrap prose"><h1>${esc(p.title)}</h1>${p.html}</main>
<footer class="footer"><div class="wrap footer-in"><div><a class="brand" href="/"><img src="/favicon.svg" alt="" width="20" height="20">GeoUnpack</a></div>
<div class="footer-links"><a href="/about/">About</a><a href="/privacy/">Privacy</a><a href="/licenses/">Open-source licenses</a></div></div>
<div class="wrap"><p class="small muted legal">GeoUnpack is an independent tool, not affiliated with or endorsed by Esri.</p></div></footer></body></html>`;
  fs.mkdirSync(path.join(dist, p.slug), { recursive: true });
  fs.writeFileSync(path.join(dist, p.slug, 'index.html'), html);
}

// 404 page: without it Cloudflare Pages answers unknown URLs with the home page and status 200 ("soft 404")
fs.writeFileSync(path.join(dist, '404.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found | GeoUnpack</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css"></head><body>
<header class="topbar"><div class="wrap topbar-in"><a class="brand" href="/"><img src="/favicon.svg" alt="" width="22" height="22">GeoUnpack</a><nav class="topnav">${nav}</nav></div></header>
<main class="wrap prose notfound"><h1>Page not found</h1><p>This page doesn't exist. The converter is on the <a href="/">home page</a>.</p>
<div class="linkgrid">${pages.filter((p) => p.slug).map((p) => `<a href="/${p.slug}/">${esc(p.h1.replace(/ Converter$/, ''))}</a>`).join('')}</div></main></body></html>`);

// sitemap, robots, llms.txt
const all = [...pages, ...prose];
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${all.map((p) => `  <url><loc>${url(p.slug)}</loc><lastmod>${p.updated || CONTENT_UPDATED}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, 'robots.txt'), NOINDEX ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(dist, 'llms.txt'),
  `# GeoUnpack\n\n> Free browser-based tool to open and convert Esri ArcGIS layer packages (.lpk, .lpkx), map packages (.mpk, .mpkx) and zipped file geodatabases (.gdb), plus KML/KMZ files and shapefiles, to Shapefile, GeoPackage, GeoJSON, KML, KMZ and CSV without ArcGIS. Conversion runs locally in the browser with GDAL compiled to WebAssembly; files are never uploaded.\n\n## Converters\n${pages.map((p) => `- [${p.h1}](${url(p.slug)}): ${p.description}`).join('\n')}\n\n## About\n- [About GeoUnpack](${url('about')}): who makes it, how it works, contact\n\n## Limits\n- Vector layers and tables only (no raster, tile or scene packages yet)\n- Files up to 150 MB\n`);

// Browsers keep app.js / styles.css / togeojson for a while: reference them with a content hash so every
// page always loads the matching files (an old app.js with a new page, or the reverse, breaks the tool).
const hashOf = (f) => crypto.createHash('sha256').update(fs.readFileSync(path.join(dist, f))).digest('hex').slice(0, 10);
const assetRefs = { '/app.js"': `/app.js?v=${hashOf('app.js')}"`, '/styles.css"': `/styles.css?v=${hashOf('styles.css')}"` };
const htmlFiles = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? htmlFiles(path.join(dir, e.name)) : e.name.endsWith('.html') ? [path.join(dir, e.name)] : []));
for (const f of htmlFiles(dist)) {
  let h = fs.readFileSync(f, 'utf8');
  for (const [from, to] of Object.entries(assetRefs)) h = h.replaceAll(`"${from}`, `"${to}`);
  fs.writeFileSync(f, h);
}

console.log(`Built ${pages.length + prose.length} pages into dist/ for ${SITE}${NOINDEX ? ' (noindex preview)' : ''}`);

// Static site generator for GeoUnpack: renders every converter page from src/pages.json
// and copies the WebAssembly libraries into dist/vendor.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
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
];
const LOCAL_GDAL = process.env.LOCAL_GDAL === '1';
if (LOCAL_GDAL) {
  // for offline testing only; these files are too big for Cloudflare Pages
  for (const f of ['gdal3.js', 'gdal3WebAssembly.wasm', 'gdal3WebAssembly.data']) vendor.push([`gdal3.js/dist/package/${f}`, f]);
}
for (const [from, to] of vendor) fs.copyFileSync(path.join(nm, from), path.join(dist, 'vendor', to));
fs.cpSync(path.join(nm, 'leaflet/dist/images'), path.join(dist, 'vendor/images'), { recursive: true });
for (const f of ['app.js', 'worker.js', 'styles.css']) fs.copyFileSync(path.join(src, f), path.join(dist, f));
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });

const url = (slug) => `${SITE}/${slug ? slug + '/' : ''}`;
const nav = [['lpk-to-shapefile', 'LPK → SHP'], ['mpk-viewer', 'MPK viewer'], ['gdb-to-shapefile', 'GDB → SHP']]
  .map(([s, t]) => `<a href="/${s}/">${t}</a>`).join('');

for (const p of pages) {
  const faqHtml = p.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n');
  const steps = p.steps.map((s) => `<li>${esc(s)}</li>`).join('');
  const related = pages.filter((o) => o.slug !== p.slug).map((o) => `<li><a href="/${o.slug ? o.slug + '/' : ''}">${esc(o.h1)}</a></li>`).join('');
  let compare = '';
  if (p.compare) {
    const [head, ...rows] = p.compare;
    compare = `<section><h2>Comparison</h2><div class="table-wrap"><table class="compare"><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${esc(c)}</td>` : `<th>${esc(c)}</th>`)).join('')}</tr>`).join('')}</tbody></table></div></section>`;
  }
  const jsonld = JSON.stringify([
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'GeoUnpack',
      applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any (web browser)',
      url: url(p.slug), description: p.description,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
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
    .replaceAll('{{title}}', esc(p.title))
    .replaceAll('{{description}}', esc(p.description))
    .replaceAll('{{canonical}}', url(p.slug))
    .replace('{{jsonld}}', jsonld)
    .replace('{{nav}}', nav)
    .replace('{{h1}}', esc(p.h1))
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
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css"></head><body>
<header class="site"><a class="brand" href="/">GeoUnpack</a><nav>${nav}</nav></header>
<main class="prose"><h1>${esc(p.title)}</h1>${p.html}</main>
<footer class="site"><p><a href="/about/">About</a> · <a href="/privacy/">Privacy</a> · <a href="/licenses/">Open-source licenses</a></p>
<p class="small">GeoUnpack is an independent tool and is not affiliated with or endorsed by Esri.</p></footer></body></html>`;
  fs.mkdirSync(path.join(dist, p.slug), { recursive: true });
  fs.writeFileSync(path.join(dist, p.slug, 'index.html'), html);
}

// sitemap, robots, llms.txt
const today = new Date().toISOString().slice(0, 10);
const allSlugs = [...pages.map((p) => p.slug), ...prose.map((p) => p.slug)];
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allSlugs.map((s) => `  <url><loc>${url(s)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, 'robots.txt'), NOINDEX ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(dist, 'llms.txt'),
  `# GeoUnpack\n\n> Free browser-based tool to open and convert Esri ArcGIS layer packages (.lpk, .lpkx), map packages (.mpk, .mpkx) and zipped file geodatabases (.gdb) to Shapefile, GeoPackage, GeoJSON, KML and CSV without ArcGIS. Conversion runs locally in the browser with GDAL compiled to WebAssembly; files are never uploaded.\n\n## Converters\n${pages.map((p) => `- [${p.h1}](${url(p.slug)}): ${p.description}`).join('\n')}\n\n## Limits\n- Vector layers and tables only (no raster, tile or scene packages yet)\n- Files up to 150 MB\n`);

console.log(`Built ${pages.length + prose.length} pages into dist/ for ${SITE}${NOINDEX ? ' (noindex preview)' : ''}`);

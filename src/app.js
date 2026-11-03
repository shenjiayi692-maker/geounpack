/* GeoUnpack UI (main thread). Conversion happens in /worker.js. */
/* global L, fflate */
(function () {
  const CFG = Object.assign(
    {
      defaultFormat: 'shp',
      maxFileMB: 150,
      paywall: false, // turned on once payments are connected
      freeFeatureLimit: 1000,
      checkoutUrl: '',
    },
    window.GEOUNPACK_CONFIG || {}
  );

  const $ = (sel) => document.querySelector(sel);
  const drop = $('#drop');
  const input = $('#file');
  const status = $('#status');
  const panel = $('#result');
  const layersEl = $('#layers');
  const formatEl = $('#format');
  const exportBtn = $('#export');
  const mapEl = $('#map');

  formatEl.value = CFG.defaultFormat;

  let worker = null;
  let reqId = 0;
  const pending = new Map();
  let layers = [];
  let map = null;
  let previewLayer = null;

  function getWorker() {
    if (worker) return worker;
    worker = new Worker('/worker.js' + (CFG.localGdal ? '?gdal=local' : ''));
    worker.onmessage = (e) => {
      const m = e.data;
      if (m.type === 'progress') return setStatus(m.msg, 'busy');
      const p = pending.get(m.id);
      if (!p) return;
      pending.delete(m.id);
      if (m.type === 'error') p.reject(new Error(m.error));
      else p.resolve(m.result);
    };
    worker.onerror = (e) => setStatus('Something went wrong in the converter: ' + (e.message || 'unknown error'), 'error');
    return worker;
  }

  function call(type, payload) {
    const id = ++reqId;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      getWorker().postMessage({ id, type, payload });
    });
  }

  function setStatus(msg, kind) {
    status.textContent = msg;
    status.className = 'status ' + (kind || '');
  }

  function unlocked() {
    if (!CFG.paywall) return true;
    try { return localStorage.getItem('gu_license') === 'ok'; } catch (_) { return false; }
  }

  function fmtCount(n) { return n == null ? '?' : n.toLocaleString('en-US'); }

  function renderLayers() {
    layersEl.innerHTML = '';
    layers.forEach((l, idx) => {
      const row = document.createElement('label');
      row.className = 'layer';
      const geom = l.geometryType ? l.geometryType : 'table (no geometry)';
      row.innerHTML =
        `<input type="checkbox" data-idx="${idx}" ${idx === firstGeomIndex() ? 'checked' : ''}>` +
        `<span class="lname"></span>` +
        `<span class="lmeta">${fmtCount(l.featureCount)} ${l.featureCount === 1 ? 'feature' : 'features'} · ${geom}${l.crs ? ' · ' + l.crs : ''}</span>` +
        (l.geometryType ? `<button type="button" class="link" data-preview="${idx}">Preview</button>` : '');
      row.querySelector('.lname').textContent = l.name + (multiSource() ? ` (${l.sourceLabel})` : '');
      layersEl.appendChild(row);
    });
  }

  function multiSource() { return new Set(layers.map((l) => l.source)).size > 1; }
  function firstGeomIndex() { return layers.findIndex((l) => l.geometryType && l.featureCount > 0); }

  function selected() {
    return [...layersEl.querySelectorAll('input[type=checkbox]:checked')].map((c) => layers[+c.dataset.idx]);
  }

  async function showPreview(l) {
    if (!map) {
      map = L.map(mapEl, { preferCanvas: true }).setView([20, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
    }
    mapEl.hidden = false;
    map.invalidateSize();
    setStatus(`Loading preview of ${l.name}…`, 'busy');
    try {
      const gj = await call('preview', { source: l.source, layer: l.name, maxFeatures: 2000 });
      if (previewLayer) previewLayer.remove();
      previewLayer = L.geoJSON(gj, {
        pointToLayer: (_f, latlng) => L.circleMarker(latlng, { radius: 4 }),
        onEachFeature: (f, lyr) => {
          const props = f.properties || {};
          const rows = Object.entries(props).slice(0, 12)
            .map(([k, v]) => `<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(String(v ?? ''))}</td></tr>`).join('');
          lyr.bindPopup(`<table class="attr">${rows}</table>`);
        },
      }).addTo(map);
      const b = previewLayer.getBounds();
      if (b.isValid()) map.fitBounds(b, { padding: [20, 20] });
      const note = l.featureCount > 2000 ? ' (first 2,000 features shown)' : '';
      setStatus(`Previewing ${l.name}${note}. Click a feature to see its attributes.`, 'ok');
    } catch (err) {
      setStatus(err.message, 'error');
    }
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function download(name, bytes, mime) {
    const blob = new Blob([bytes], { type: mime || 'application/octet-stream' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
  }

  async function handleFile(file) {
    if (!file) return;
    const mb = file.size / 1e6;
    if (mb > CFG.maxFileMB) {
      setStatus(`This file is ${mb.toFixed(0)} MB. The current limit is ${CFG.maxFileMB} MB so your browser does not run out of memory.`, 'error');
      return;
    }
    panel.hidden = true;
    mapEl.hidden = true;
    setStatus(`Opening ${file.name}…`, 'busy');
    try {
      layers = await call('open', { file });
      renderLayers();
      panel.hidden = false;
      const geomCount = layers.filter((l) => l.geometryType).length;
      setStatus(`Found ${layers.length} layer(s) in ${file.name}, ${geomCount} with geometry. Choose layers and a format, then export.`, 'ok');
      const first = layers[firstGeomIndex()];
      if (first) showPreview(first);
    } catch (err) {
      setStatus(err.message, 'error');
    }
  }

  async function doExport() {
    const sel = selected();
    if (!sel.length) return setStatus('Select at least one layer to export.', 'error');
    const format = formatEl.value;
    const isUnlocked = unlocked();
    if (!isUnlocked && sel.length > 1) {
      return setStatus('The free version exports one layer at a time. Unlock this file to export all layers at once.', 'error');
    }
    exportBtn.disabled = true;
    try {
      const zipEntries = {};
      for (const l of sel) {
        const fmt = !l.geometryType ? 'csv' : format;
        const limit = !isUnlocked && l.featureCount > CFG.freeFeatureLimit ? CFG.freeFeatureLimit : undefined;
        const r = await call('export', { source: l.source, layer: l.name, format: fmt, limit, hasGeometry: !!l.geometryType });
        if (r.files.length === 1 && sel.length === 1) {
          download(r.files[0].name.includes('.') ? r.files[0].name : `${r.layer}.${r.ext}`, r.files[0].bytes);
        } else {
          for (const f of r.files) zipEntries[`${r.layer}/${f.name}`] = new Uint8Array(f.bytes);
        }
      }
      if (Object.keys(zipEntries).length) {
        const zipped = fflate.zipSync(zipEntries, { level: 6 });
        download(sel.length === 1 ? `${sel[0].name}_${format}.zip` : `geounpack_export_${format}.zip`, zipped, 'application/zip');
      }
      let msg = 'Done. Check your downloads folder.';
      if (format === 'shp') msg += ' Note: Shapefile field names are limited to 10 characters and very large numbers can be truncated; use GeoPackage or GeoJSON if exact values matter.';
      if (!isUnlocked && sel.some((l) => l.featureCount > CFG.freeFeatureLimit)) msg += ` The free version exported the first ${CFG.freeFeatureLimit.toLocaleString()} features.`;
      setStatus(msg, 'ok');
    } catch (err) {
      setStatus(err.message, 'error');
    } finally {
      exportBtn.disabled = false;
    }
  }

  // events
  drop.addEventListener('click', () => input.click());
  drop.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
  input.addEventListener('change', () => handleFile(input.files[0]));
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', (e) => handleFile(e.dataTransfer.files[0]));
  layersEl.addEventListener('click', (e) => {
    const idx = e.target?.dataset?.preview;
    if (idx !== undefined) { e.preventDefault(); showPreview(layers[+idx]); }
  });
  exportBtn.addEventListener('click', doExport);
})();

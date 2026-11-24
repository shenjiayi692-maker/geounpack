/* GeoUnpack UI (main thread). Conversion happens in /worker.js. */
/* global L, fflate */
(function () {
  const CFG = Object.assign(
    {
      defaultFormat: 'shp',
      maxFileMB: 150,
      bigFileMB: 40, // above this, warn that opening/converting can take 1–2 minutes
      paywall: false, // turned on once payments are connected
      freeFeatureLimit: 1000,
      checkoutUrl: '',
    },
    window.GEOUNPACK_CONFIG || {}
  );

  // Anonymous usage count (see functions/api/e.js): event name and a short category only.
  const track = (e, d) => { try { navigator.sendBeacon('/api/e', JSON.stringify({ e, d: d || '', p: location.pathname })); } catch (_) { /* ignore */ } };
  const errKind = (m) => (/memory/i.test(m) ? 'memory' : /unpacked|damaged/i.test(m) ? 'unpack' : /No geodatabase|raster/i.test(m) ? 'no_vector' : /engine/i.test(m) ? 'engine' : 'other');
  // For diagnosing failed opens without knowing the file: its extension and what its first bytes say it really is.
  const extOf = (name) => { const m = /\.([a-z0-9]{1,6})$/i.exec(name); return m ? m[1].toLowerCase() : 'none'; };
  async function signature(file) {
    try {
      const b = new Uint8Array(await file.slice(0, 8).arrayBuffer());
      const s = (sig) => sig.every((v, i) => b[i] === v);
      if (s([0x37, 0x7a, 0xbc, 0xaf])) return '7z';
      if (s([0x50, 0x4b])) return 'zip';
      if (s([0x52, 0x61, 0x72, 0x21])) return 'rar';
      if (s([0x1f, 0x8b])) return 'gzip';
      if (s([0x25, 0x50, 0x44, 0x46])) return 'pdf';
      if (s([0x3c])) return 'xml';
      return b.length ? 'other' : 'empty';
    } catch (_) { return 'unread'; }
  }
  // Export failures: a coarse category only (GDAL messages can contain layer names, which we never record).
  const exportErrKind = (m) => (/memory|Aborted\(|out of bounds/i.test(m) ? 'memory'
    : /transform|coordinate system|srs|projection|proj/i.test(m) ? 'crs'
      : /source not found/i.test(m) ? 'nosource'
        : /geometry|geom|nlt|polygon|curve|surface|tin\b/i.test(m) ? 'geometry'
          : /field|column|attribute/i.test(m) ? 'field'
            : /exist/i.test(m) ? 'exists'
              : /not defined|undefined|null|is not a function|typeerror/i.test(m) ? 'js'
                : /damaged|reading this file/i.test(m) ? 'read' : 'other');
  const geomKey = (g) => (g ? String(g).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 18) : 'table');
  const sizeBucket = (mb) => (mb < 1 ? 'lt1mb' : mb < 10 ? '1-10mb' : mb < 50 ? '10-50mb' : '50-150mb');
  // After an error, add a mail link with a fixed subject tag so real reports stand out from sales email.
  function addReportLink(what, detail) {
    const a = document.createElement('a');
    const body = `Hi,\n\nThis ${what} did not work in GeoUnpack (${location.pathname}).\nWhat it said: ${detail}\n\nI have attached the file (or: I can't share it, but here is what is in it):\n\n`;
    a.href = `mailto:hello@geounpack.com?subject=${encodeURIComponent(`[GeoUnpack feedback] ${what === 'file' ? 'File that does not open' : 'Layer that does not convert'}`)}&body=${encodeURIComponent(body)}`;
    a.textContent = 'Email us the file';
    status.append(' ', a, '.');
  }
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
    worker.onerror = (e) => {
      // The engine crashed (usually out of memory) or failed to load. Fail every waiting request so the
      // buttons come back, and start a fresh worker next time.
      const msg = /importScripts|NetworkError|Failed to load/i.test(e.message || '')
        ? 'The conversion engine could not be downloaded. Check your connection (or a network filter blocking cdn.geounpack.com) and try again.'
        : 'The converter stopped unexpectedly, most likely because the browser ran out of memory. Please open the file again and export one layer at a time.';
      try { worker.terminate(); } catch (_) { /* ignore */ }
      worker = null;
      track(/downloaded/.test(msg) ? 'engine_fail' : 'crash', errKind(e.message || ''));
      const waiting = [...pending.values()];
      pending.clear();
      if (waiting.length) waiting.forEach((p) => p.reject(new Error(msg)));
      else setStatus(msg, 'error');
      panel.hidden = true; // layers belonged to the dead worker
    };
    return worker;
  }

  function call(type, payload) {
    const id = ++reqId;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      getWorker().postMessage({ id, type, payload });
    });
  }

  // Progress: while busy, show elapsed seconds, plus a heads-up when the current file is large.
  let busySince = 0;
  let busyMsg = '';
  let busyTimer = null;
  let bigFileHint = '';
  function renderBusy() {
    const secs = Math.floor((Date.now() - busySince) / 1000);
    status.textContent = busyMsg + (secs >= 2 ? ` (${secs} s)` : '') + bigFileHint;
  }
  function setStatus(msg, kind) {
    status.className = 'status ' + (kind || '');
    if (kind === 'busy') {
      if (!busyTimer) { busySince = Date.now(); busyTimer = setInterval(renderBusy, 1000); }
      busyMsg = msg;
      renderBusy();
      return;
    }
    if (busyTimer) { clearInterval(busyTimer); busyTimer = null; }
    status.textContent = msg;
  }

  function unlocked() {
    if (!CFG.paywall) return true;
    try { return localStorage.getItem('gu_license') === 'ok'; } catch (_) { return false; }
  }

  function fmtCount(n) { return n == null ? '?' : n.toLocaleString('en-US'); }

  function geomLabel(t) {
    if (!t) return 'Table';
    const g = t.replace(/^Multi/, '').replace(/ ?Z$| ?M$| ?ZM$/, '');
    return { Point: 'Points', LineString: 'Lines', Polygon: 'Polygons' }[g] || t;
  }

  function renderLayers() {
    layersEl.innerHTML = '';
    const first = firstGeomIndex();
    layers.forEach((l, idx) => {
      const tr = document.createElement('tr');
      if (!l.geometryType) tr.className = 'is-table';
      const id = `lyr${idx}`;
      tr.innerHTML =
        `<td class="c-check"><input type="checkbox" id="${id}" data-idx="${idx}" ${idx === first ? 'checked' : ''}></td>` +
        `<td class="lname"><label for="${id}"></label></td>` +
        `<td>${geomLabel(l.geometryType)}</td>` +
        `<td class="num">${fmtCount(l.featureCount)}</td>` +
        `<td>${l.crs ? escapeHtml(l.crs) : '–'}</td>` +
        `<td>${l.geometryType && l.featureCount ? `<button type="button" class="link" data-preview="${idx}">Preview</button>` : ''}</td>`;
      tr.querySelector('label').textContent = l.name + (multiSource() ? ` (${l.sourceLabel})` : '');
      layersEl.appendChild(tr);
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
      setStatus(`Showing ${l.name} on the map${note}. Click a feature to see its attributes.`, 'ok');
    } catch (err) {
      track('preview_fail', `${exportErrKind(err.message)}:${geomKey(l.geometryType)}`);
      setStatus(err.message, 'error');
    }
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // File name shown to the user: keep non-English letters, drop only characters Windows/macOS reject.
  function niceName(s) { return String(s).replace(/[\\/:*?"<>|\u0000-\u001f]+/g, '_').replace(/^\.+/, '') || 'layer'; }
  // GDAL writes files named after an ASCII-safe layer name; swap that prefix for the readable one.
  function outFileName(fileName, safeLayer, nice) {
    return fileName.startsWith(safeLayer) ? nice + fileName.slice(safeLayer.length) : fileName;
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
      track('open_fail', 'too_big');
      setStatus(`This file is ${mb.toFixed(0)} MB. The current limit is ${CFG.maxFileMB} MB so your browser does not run out of memory.`, 'error');
      return;
    }
    panel.hidden = true;
    mapEl.hidden = true;
    bigFileHint = mb > CFG.bigFileMB
      ? ` This is a large file (${mb.toFixed(0)} MB): opening and converting can take 1–2 minutes. Keep this tab open; it is still working.`
      : '';
    setStatus(`Opening ${file.name}…`, 'busy');
    try {
      layers = await call('open', { file });
      track('open_ok', `${(file.name.match(/\.(lpkx?|mpkx?|zip|7z)$/i) || [, 'other'])[1].toLowerCase()}:${sizeBucket(mb)}`);
      renderLayers();
      panel.hidden = false;
      const geomCount = layers.filter((l) => l.geometryType).length;
      setStatus(`${file.name}: ${layers.length} ${layers.length === 1 ? 'layer' : 'layers'} found (${geomCount} with geometry). Tick the ones you need, then convert.`, 'ok');
      const first = layers[firstGeomIndex()];
      if (first) showPreview(first);
    } catch (err) {
      const kind = errKind(err.message);
      track('open_fail', `${kind}:${extOf(file.name)}:${await signature(file)}:${sizeBucket(mb)}`);
      setStatus(err.message + (kind === 'memory' ? '' : ' If you can share this file, we will look into why it does not open:'), 'error');
      if (kind !== 'memory') addReportLink('file', err.message);
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
      const usedFolders = new Set();
      const failed = []; // one bad layer must not cost the user all the others
      let okCount = 0;
      let single = null;
      for (const l of sel) {
        const fmt = !l.geometryType ? 'csv' : format === 'kmz' ? 'kml' : format;
        const limit = !isUnlocked && l.featureCount > CFG.freeFeatureLimit ? CFG.freeFeatureLimit : undefined;
        let r;
        try {
          r = await call('export', { source: l.source, layer: l.name, format: fmt, limit, hasGeometry: !!l.geometryType });
        } catch (err) {
          failed.push({ l, fmt, msg: err.message });
          track('export_fail', `${exportErrKind(err.message)}:${format}:${geomKey(l.geometryType)}`);
          continue;
        }
        if (fmt === 'kml' && format === 'kmz') {
          // KMZ is a zip holding one KML named doc.kml; Google Earth and My Maps open it directly
          r.files = [{ name: `${r.layer}.kmz`, bytes: fflate.zipSync({ 'doc.kml': new Uint8Array(r.files[0].bytes) }, { level: 6 }) }];
          r.ext = 'kmz';
        }
        okCount++;
        const nice = niceName(l.name);
        if (r.files.length === 1 && sel.length === 1) {
          single = { r, nice };
        } else {
          // one folder per layer; two layers with the same name (from different geodatabases) must not overwrite each other
          let folder = nice;
          for (let n = 2; usedFolders.has(folder.toLowerCase()); n++) folder = `${nice}_${n}`;
          usedFolders.add(folder.toLowerCase());
          for (const f of r.files) zipEntries[`${folder}/${outFileName(f.name, r.layer, nice)}`] = new Uint8Array(f.bytes);
        }
      }
      if (single) {
        const f = single.r.files[0];
        download(f.name.includes('.') ? outFileName(f.name, single.r.layer, single.nice) : `${single.nice}.${single.r.ext}`, f.bytes);
      } else if (Object.keys(zipEntries).length) {
        const zipped = fflate.zipSync(zipEntries, { level: 6 });
        download(sel.length === 1 ? `${niceName(sel[0].name)}_${format}.zip` : `geounpack_export_${format}.zip`, zipped, 'application/zip');
      }
      const failNote = failed.length
        ? ` ${failed.length === sel.length ? 'Nothing could be converted' : `${failed.length} of ${sel.length} layers could not be converted`}: `
          + failed.map((x) => `${x.l.name} (${x.fmt.toUpperCase()}: ${x.msg})`).join('; ')
          + '. Try another format for those layers (GeoPackage keeps the most), or send us the file so we can fix it:'
        : '';
      if (!okCount) {
        setStatus(failNote.trim(), 'error');
        addReportLink('layer', failed.map((x) => `${x.fmt.toUpperCase()}: ${x.msg}`).join('; '));
        return;
      }
      let msg = 'Done. Check your downloads folder.';
      if (format === 'kmz') msg += ' Open the .kmz in Google Earth, or import it into Google My Maps (My Maps accepts up to about 2,000 features per layer).';
      if (format === 'shp') msg += ' Note: Shapefile field names are limited to 10 characters and very large numbers can be truncated; use GeoPackage or GeoJSON if exact values matter.';
      if (!isUnlocked && sel.some((l) => l.featureCount > CFG.freeFeatureLimit)) msg += ` The free version exported the first ${CFG.freeFeatureLimit.toLocaleString()} features.`;
      track('export_ok', `${format}:${sel.length > 1 ? 'multi' : 'single'}${failed.length ? ':partial' : ''}`);
      setStatus(msg + failNote, failed.length ? 'error' : 'ok');
      if (failed.length) addReportLink('layer', failed.map((x) => `${x.fmt.toUpperCase()}: ${x.msg}`).join('; '));
    } catch (err) {
      track('export_fail', `${exportErrKind(err.message)}:${format}:app`);
      setStatus(err.message, 'error');
    } finally {
      exportBtn.disabled = false;
    }
  }

  // events
  drop.addEventListener('click', () => input.click());
  drop.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
  input.addEventListener('change', () => {
    const f = input.files[0];
    input.value = ''; // so choosing the same file again (e.g. to retry) still fires 'change'
    handleFile(f);
  });
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', (e) => handleFile(e.dataTransfer.files[0]));
  layersEl.addEventListener('click', (e) => {
    const idx = e.target?.dataset?.preview;
    if (idx !== undefined) { e.preventDefault(); showPreview(layers[+idx]); }
  });
  exportBtn.addEventListener('click', doExport);
})();

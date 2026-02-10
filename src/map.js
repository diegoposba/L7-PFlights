// Module carte L7 — Scene, layers, popups, interactivité
import { Scene, PointLayer, LineLayer, Popup, Zoom, Scale, MapLibre } from '@antv/l7';
import { airports, airportByIata, ARCHIPELS } from './airports.js';
import { routes, AIRLINES } from './routes.js';

let scene = null;
let airportLayer = null;
let intlAirportLayer = null;
let airportLabelLayer = null;
let interIslandArcLayer = null;
let internationalArcLayer = null;
let currentPopup = null;
let highlightedAirport = null;

// Données de routes actives (hardcodées + API)
let activeRoutes = [...routes];

// ─── Initialisation de la Scene L7 ────────────────────────────────────────────

export function initMap(containerId) {
  scene = new Scene({
    id: containerId,
    map: new MapLibre({
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-149.5, -15.5],
      zoom: 5.5,
      minZoom: 2,
      maxZoom: 15,
    }),
  });

  scene.on('loaded', () => {
    addControls();
    renderAirports();
    renderRoutes();
    updateStats();
  });

  return scene;
}

// ─── Contrôles de carte ───────────────────────────────────────────────────────

function addControls() {
  scene.addControl(new Zoom({ position: 'bottomright' }));
  scene.addControl(new Scale({ position: 'bottomleft' }));
}

// ─── Rendu des aéroports ──────────────────────────────────────────────────────

function renderAirports() {
  const pfData = airports.filter(a => a.archipel !== 'INTERNATIONAL');
  const intlData = airports.filter(a => a.archipel === 'INTERNATIONAL');

  // Aéroports PF : cercles colorés par archipel
  airportLayer = new PointLayer({ zIndex: 10 })
    .source(pfData, {
      parser: { type: 'json', x: 'lng', y: 'lat' },
    })
    .shape('circle')
    .size('hub', (hub) => (hub ? 12 : 6))
    .color('archipel', (archipel) => ARCHIPELS[archipel]?.color || '#fff')
    .style({
      opacity: 0.9,
      strokeWidth: 1.5,
      stroke: '#fff',
    });

  // Aéroports internationaux : carrés oranges
  intlAirportLayer = new PointLayer({ zIndex: 10 })
    .source(intlData, {
      parser: { type: 'json', x: 'lng', y: 'lat' },
    })
    .shape('square')
    .size(8)
    .color(ARCHIPELS.INTERNATIONAL.color)
    .style({
      opacity: 0.9,
      strokeWidth: 1.5,
      stroke: '#fff',
    });

  // Labels des aéroports (codes IATA)
  airportLabelLayer = new PointLayer({ zIndex: 15 })
    .source(airports, {
      parser: { type: 'json', x: 'lng', y: 'lat' },
    })
    .shape('iata', 'text')
    .size(10)
    .color('#e0e0e0')
    .style({
      textAnchor: 'bottom',
      textOffset: [0, -8],
      fontWeight: 'bold',
      textAllowOverlap: false,
      padding: [2, 2],
    });

  scene.addLayer(airportLayer);
  scene.addLayer(intlAirportLayer);
  scene.addLayer(airportLabelLayer);

  // Événements sur les aéroports PF
  airportLayer.on('mousemove', onAirportHover);
  airportLayer.on('mouseout', hidePopup);
  airportLayer.on('click', onAirportClick);

  // Événements sur les aéroports internationaux
  intlAirportLayer.on('mousemove', onAirportHover);
  intlAirportLayer.on('mouseout', hidePopup);
  intlAirportLayer.on('click', onAirportClick);
}

function onAirportHover(e) {
  const { iata, name, island, archipel } = e.feature;
  showPopup(e.lngLat.lng, e.lngLat.lat, `
    <div class="popup-content">
      <strong>${iata}</strong> — ${name}
      <br/><span class="popup-detail">${island} · ${ARCHIPELS[archipel]?.name || archipel}</span>
    </div>
  `);
}

function onAirportClick(e) {
  const { iata } = e.feature;
  highlightAirport(iata);
}

// ─── Rendu des routes (arcs) ──────────────────────────────────────────────────

function renderRoutes(routeData) {
  const data = routeData || activeRoutes;

  // Supprimer les anciennes couches d'arcs
  if (interIslandArcLayer) {
    scene.removeLayer(interIslandArcLayer);
    interIslandArcLayer = null;
  }
  if (internationalArcLayer) {
    scene.removeLayer(internationalArcLayer);
    internationalArcLayer = null;
  }

  // Construire les données géo pour les arcs
  const interIslandData = buildArcData(data.filter(r => r.type === 'interile'));
  const internationalData = buildArcData(data.filter(r => r.type === 'international'));

  // Arcs inter-îles (bleu)
  if (interIslandData.length > 0) {
    interIslandArcLayer = new LineLayer({ zIndex: 5 })
      .source(interIslandData, {
        parser: {
          type: 'json',
          x: 'fromLng',
          y: 'fromLat',
          x1: 'toLng',
          y1: 'toLat',
        },
      })
      .shape('arc')
      .size(1.5)
      .color('#4FC3F7')
      .style({
        opacity: 0.6,
        blur: 0.5,
      });

    scene.addLayer(interIslandArcLayer);

    // Événements sur les arcs
    interIslandArcLayer.on('mousemove', onArcHover);
    interIslandArcLayer.on('mouseout', hidePopup);
  }

  // Arcs internationaux (rouge/orange)
  if (internationalData.length > 0) {
    internationalArcLayer = new LineLayer({ zIndex: 5 })
      .source(internationalData, {
        parser: {
          type: 'json',
          x: 'fromLng',
          y: 'fromLat',
          x1: 'toLng',
          y1: 'toLat',
        },
      })
      .shape('arc')
      .size(2)
      .color('#FF8A65')
      .style({
        opacity: 0.7,
        blur: 0.5,
      });

    scene.addLayer(internationalArcLayer);

    // Événements sur les arcs
    internationalArcLayer.on('mousemove', onArcHover);
    internationalArcLayer.on('mouseout', hidePopup);
  }
}

function onArcHover(e) {
  const { from, to, fromName, toName, airlineName } = e.feature;
  showPopup(e.lngLat.lng, e.lngLat.lat, `
    <div class="popup-content">
      <strong>${from} → ${to}</strong>
      <br/><span class="popup-detail">${fromName} → ${toName}</span>
      <br/><span class="popup-airline">${airlineName}</span>
    </div>
  `);
}

function buildArcData(routeList) {
  return routeList
    .map(r => {
      const from = airportByIata[r.from];
      const to = airportByIata[r.to];
      if (!from || !to) return null;
      return {
        fromLng: from.lng,
        fromLat: from.lat,
        toLng: to.lng,
        toLat: to.lat,
        from: r.from,
        to: r.to,
        fromName: from.name,
        toName: to.name,
        airline: r.airline,
        airlineName: AIRLINES[r.airline]?.name || r.airline,
        type: r.type,
      };
    })
    .filter(Boolean);
}

// ─── Popups ───────────────────────────────────────────────────────────────────

function showPopup(lng, lat, html) {
  hidePopup();
  currentPopup = new Popup({
    offsets: [0, -10],
    closeButton: false,
    closeOnClick: false,
  })
    .setLnglat({ lng, lat })
    .setHTML(html);
  scene.addPopup(currentPopup);
}

function hidePopup() {
  if (currentPopup) {
    currentPopup.remove();
    currentPopup = null;
  }
}

// ─── Highlight d'un aéroport ──────────────────────────────────────────────────

export function highlightAirport(iata) {
  highlightedAirport = iata;
  const filteredRoutes = activeRoutes.filter(r => r.from === iata || r.to === iata);
  renderRoutes(filteredRoutes);

  const infoEl = document.getElementById('selected-info');
  if (infoEl) {
    const airport = airportByIata[iata];
    if (airport) {
      infoEl.innerHTML = `
        <h3>${airport.iata} — ${airport.name}</h3>
        <p>${airport.island} · ${ARCHIPELS[airport.archipel]?.name || airport.archipel}</p>
        <p><strong>${filteredRoutes.length}</strong> route(s) directe(s)</p>
        <button id="btn-reset" class="btn-secondary">Voir toutes les routes</button>
      `;
      document.getElementById('btn-reset')?.addEventListener('click', resetHighlight);
    }
  }
}

export function resetHighlight() {
  highlightedAirport = null;
  renderRoutes(activeRoutes);

  const infoEl = document.getElementById('selected-info');
  if (infoEl) {
    infoEl.innerHTML = '<p class="hint">Cliquez sur un aéroport pour voir ses routes</p>';
  }
}

// ─── Filtres ──────────────────────────────────────────────────────────────────

export function applyFilters({ showInterIsland, showInternational, selectedAirline }) {
  let filtered = [...activeRoutes];

  if (!showInterIsland) {
    filtered = filtered.filter(r => r.type !== 'interile');
  }
  if (!showInternational) {
    filtered = filtered.filter(r => r.type !== 'international');
  }
  if (selectedAirline && selectedAirline !== 'all') {
    filtered = filtered.filter(r => r.airline === selectedAirline);
  }

  if (highlightedAirport) {
    filtered = filtered.filter(r => r.from === highlightedAirport || r.to === highlightedAirport);
  }

  renderRoutes(filtered);
}

// ─── Mise à jour avec données API ─────────────────────────────────────────────

export function mergeApiRoutes(apiRoutes) {
  const existingKeys = new Set(activeRoutes.map(r => `${r.from}-${r.to}-${r.airline}`));

  for (const route of apiRoutes) {
    const key = `${route.from}-${route.to}-${route.airline}`;
    if (!existingKeys.has(key)) {
      activeRoutes.push(route);
      existingKeys.add(key);
    }
  }

  renderRoutes(activeRoutes);
  updateStats();
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function updateStats() {
  const statsEl = document.getElementById('stats');
  if (!statsEl) return;

  const pfCount = airports.filter(a => a.archipel !== 'INTERNATIONAL').length;
  const interIslandCount = activeRoutes.filter(r => r.type === 'interile').length;
  const internationalCount = activeRoutes.filter(r => r.type === 'international').length;
  const airlineCount = new Set(activeRoutes.map(r => r.airline)).size;

  statsEl.innerHTML = `
    <div class="stat"><span class="stat-value">${pfCount}</span><span class="stat-label">Aéroports PF</span></div>
    <div class="stat"><span class="stat-value">${interIslandCount}</span><span class="stat-label">Routes inter-îles</span></div>
    <div class="stat"><span class="stat-value">${internationalCount}</span><span class="stat-label">Routes internationales</span></div>
    <div class="stat"><span class="stat-value">${airlineCount}</span><span class="stat-label">Compagnies</span></div>
  `;
}

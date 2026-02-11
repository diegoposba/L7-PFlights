// Module carte L7 — Mode Globe (EarthLayer)
import { Scene, EarthLayer, PointLayer, LineLayer, Popup } from '@antv/l7';
import { Earth } from '@antv/l7-maps';
import { airports, airportByIata, ARCHIPELS } from './airports.js';
import { routes, AIRLINES } from './routes.js';

let scene = null;
let airportLayer = null;
let intlAirportLayer = null;
let airportLabelLayer = null;
let interIslandArcLayer = null;
let interIslandFlyLayer = null;
let internationalArcLayer = null;
let internationalFlyLayer = null;
let currentPopup = null;

// Données de routes actives (hardcodées + API)
let activeRoutes = [...routes];

const EARTH_TEXTURE =
  'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';

// ─── Initialisation de la Scene Globe ────────────────────────────────────────

export function initEarthMap(containerId) {
  scene = new Scene({
    id: containerId,
    map: new Earth({}),
  });

  scene.addImage(
    'plane',
    'https://gw.alipayobjects.com/zos/bmw-prod/0ca1668e-38c2-4010-8568-b57cb33839b9.svg',
  );

  scene.on('loaded', () => {
    scene.setCenter([-149.5, -17.5]);
    scene.setZoom(3);
    addEarthLayers();
    renderAirports();
    renderRoutes();
    updateStats();
  });

  return scene;
}

export function destroyEarthMap() {
  if (scene) {
    scene.destroy();
    scene = null;
    airportLayer = null;
    intlAirportLayer = null;
    airportLabelLayer = null;
    interIslandArcLayer = null;
    interIslandFlyLayer = null;
    internationalArcLayer = null;
    internationalFlyLayer = null;
    currentPopup = null;
  }
}

// ─── Couches du globe ────────────────────────────────────────────────────────

function addEarthLayers() {
  const earthLayer = new EarthLayer()
    .source(EARTH_TEXTURE, {
      parser: {
        type: 'image',
        extent: [121.168, 30.2828, 121.384, 30.421],
      },
    })
    .shape('base')
    .style({
      opacity: 1.0,
      radius: 40,
      globalOptions: {
        ambientRatio: 0.6,
        diffuseRatio: 0.4,
        specularRatio: 0.1,
        earthTime: 4.0,
      },
    });

  const atomLayer = new EarthLayer()
    .color('#2E8AE6')
    .shape('atomSphere');

  const bloomLayer = new EarthLayer()
    .color('#fff')
    .shape('bloomSphere')
    .style({ opacity: 0.5 });

  scene.addLayer(earthLayer);
  scene.addLayer(atomLayer);
  scene.addLayer(bloomLayer);
}

// ─── Rendu des aéroports ─────────────────────────────────────────────────────

function renderAirports() {
  const pfData = airports.filter(a => a.archipel !== 'INTERNATIONAL');
  const intlData = airports.filter(a => a.archipel === 'INTERNATIONAL');

  // Effet pulsant sur les aéroports PF
  const pfDotLayer = new PointLayer({ zIndex: 8 })
    .source(pfData, {
      parser: { type: 'json', x: 'lng', y: 'lat' },
    })
    .shape('circle')
    .size('hub', (hub) => (hub ? 15 : 7))
    .color('archipel', (archipel) => ARCHIPELS[archipel]?.color || '#fff')
    .animate(true);

  // Effet pulsant sur les aéroports internationaux
  const intlDotLayer = new PointLayer({ zIndex: 8 })
    .source(intlData, {
      parser: { type: 'json', x: 'lng', y: 'lat' },
    })
    .shape('circle')
    .size(35)
    .color(ARCHIPELS.INTERNATIONAL.color)
    .animate(true);

  // Aéroports PF : cercles colorés par archipel
  airportLayer = new PointLayer({ zIndex: 10 })
    .source(pfData, {
      parser: { type: 'json', x: 'lng', y: 'lat' },
    })
    .shape('circle')
    .size('hub', (hub) => (hub ? 4 : 2))
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

  scene.addLayer(pfDotLayer);
  scene.addLayer(intlDotLayer);
  scene.addLayer(airportLayer);
  scene.addLayer(intlAirportLayer);
  scene.addLayer(airportLabelLayer);

  airportLayer.on('mousemove', onAirportHover);
  airportLayer.on('mouseout', hidePopup);
  airportLayer.on('click', onAirportClick);

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
  const select = document.getElementById('filter-airport');
  if (select) {
    select.value = iata;
    select.dispatchEvent(new Event('change'));
  }
}

// ─── Rendu des routes (arcs) ─────────────────────────────────────────────────

function renderRoutes(routeData) {
  const data = routeData || activeRoutes;

  // Supprimer les anciennes couches d'arcs
  [interIslandArcLayer, interIslandFlyLayer, internationalArcLayer, internationalFlyLayer]
    .forEach(layer => { if (layer) scene.removeLayer(layer); });
  interIslandArcLayer = null;
  interIslandFlyLayer = null;
  internationalArcLayer = null;
  internationalFlyLayer = null;

  // Construire les données géo pour les arcs
  const interIslandData = buildArcData(data.filter(r => r.type === 'interile'));
  const internationalData = buildArcData(data.filter(r => r.type === 'international'));

  const arcParser = {
    type: 'json',
    x: 'fromLng',
    y: 'fromLat',
    x1: 'toLng',
    y1: 'toLat',
  };

  // ── Arcs inter-îles ───────────────────────────────────────────────────────
  if (interIslandData.length > 0) {
    interIslandArcLayer = new LineLayer({ zIndex: 1000 })
      .source(interIslandData, { parser: arcParser })
      .shape('arc3d')
      .size(0.1)
      .color('#4FC3F7')
      .style({
        lineType: 'dash',
        dashArray: [5, 5],
        opacity: 0.4,
        segmentNumber: 30,
      });

    interIslandFlyLayer = new LineLayer({ zIndex: 6, blend: 'normal' })
      .source(interIslandData, { parser: arcParser })
      .shape('arc3d')
      .size(1)
      .color('#4FC3F7')
      .texture('plane')
      .animate({
        duration: 2,
        interval: 0.5,
        trailLength: 0.05,
      })
      .style({
        textureBlend: 'replace',
        lineTexture: true,
        iconStep: 6,
        segmentNumber: 30,
      });

    scene.addLayer(interIslandArcLayer);
    scene.addLayer(interIslandFlyLayer);

    interIslandArcLayer.on('mousemove', onArcHover);
    interIslandArcLayer.on('mouseout', hidePopup);
  }

  // ── Arcs internationaux ───────────────────────────────────────────────────
  if (internationalData.length > 0) {
    internationalArcLayer = new LineLayer({ zIndex: 1000 })
      .source(internationalData, { parser: arcParser })
      .shape('arc3d')
      .size(0.1)
      .color('#FFD54F')
      .style({
        lineType: 'dash',
        dashArray: [5, 5],
        opacity: 0.4,
        segmentNumber: 30,
      });

    internationalFlyLayer = new LineLayer({ zIndex: 6, blend: 'normal' })
      .source(internationalData, { parser: arcParser })
      .shape('arc3d')
      .size(1)
      .color('#FFD54F')
      .texture('plane')
      .animate({
        duration: 1,
        interval: 0.2,
        trailLength: 0.05,
      })
      .style({
        textureBlend: 'replace',
        lineTexture: true,
        iconStep: 6,
        segmentNumber: 30,
      });

    scene.addLayer(internationalArcLayer);
    scene.addLayer(internationalFlyLayer);

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

      // Correction antiméridien
      let toLng = to.lng;
      const lngDiff = toLng - from.lng;
      if (lngDiff > 180) {
        toLng -= 360;
      } else if (lngDiff < -180) {
        toLng += 360;
      }

      return {
        fromLng: from.lng,
        fromLat: from.lat,
        toLng,
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

// ─── Popups ──────────────────────────────────────────────────────────────────

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

// ─── Filtres ─────────────────────────────────────────────────────────────────

export function applyEarthFilters({ showInterIsland, showInternational, selectedAirline, selectedAirport }) {
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
  if (selectedAirport && selectedAirport !== 'all') {
    filtered = filtered.filter(r => r.from === selectedAirport || r.to === selectedAirport);
  }

  renderRoutes(filtered);
}

// ─── Mise à jour avec données API ────────────────────────────────────────────

export function mergeEarthApiRoutes(apiRoutes) {
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

// ─── Stats ───────────────────────────────────────────────────────────────────

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

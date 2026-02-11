import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import { initMap, applyFilters } from './map.js';
import { initEarthMap, destroyEarthMap, applyEarthFilters } from './map2.js';
import { airports, ARCHIPELS } from './airports.js';
import { AIRLINES, activeAirlines } from './routes.js';

// ─── État du mode carte ──────────────────────────────────────────────────────

let currentMode = 'flat'; // 'flat' | 'earth'

// ─── Initialisation ───────────────────────────────────────────────────────────

initMap('map');

// ─── Légende des archipels ────────────────────────────────────────────────────

const legendEl = document.getElementById('legend-archipels');
if (legendEl) {
  legendEl.innerHTML = Object.entries(ARCHIPELS)
    .map(([key, { name, color }]) => `
      <div class="legend-item">
        <span class="legend-color" style="background:${color}"></span>
        ${name}
      </div>
    `)
    .join('');
}

// ─── Sélecteur de compagnie ───────────────────────────────────────────────────

const airlineSelect = document.getElementById('filter-airline');
if (airlineSelect) {
  for (const code of activeAirlines) {
    const airline = AIRLINES[code];
    const option = document.createElement('option');
    option.value = code;
    option.textContent = airline ? `${airline.name} (${code})` : code;
    airlineSelect.appendChild(option);
  }
}

// ─── Sélecteur d'aéroport ────────────────────────────────────────────────────

const airportSelect = document.getElementById('filter-airport');
if (airportSelect) {
  const sorted = [...airports].sort((a, b) => a.iata.localeCompare(b.iata));
  for (const ap of sorted) {
    const option = document.createElement('option');
    option.value = ap.iata;
    option.textContent = `${ap.iata} — ${ap.name}`;
    airportSelect.appendChild(option);
  }
}

// ─── Gestion des filtres ──────────────────────────────────────────────────────

function getFilterState() {
  return {
    showInterIsland: document.getElementById('filter-interisland').checked,
    showInternational: document.getElementById('filter-international').checked,
    selectedAirline: document.getElementById('filter-airline').value,
    selectedAirport: document.getElementById('filter-airport').value,
  };
}

function onFilterChange() {
  const filters = getFilterState();
  if (currentMode === 'flat') {
    applyFilters(filters);
  } else {
    applyEarthFilters(filters);
  }
}

document.getElementById('filter-interisland')?.addEventListener('change', onFilterChange);
document.getElementById('filter-international')?.addEventListener('change', onFilterChange);
document.getElementById('filter-airline')?.addEventListener('change', onFilterChange);
document.getElementById('filter-airport')?.addEventListener('change', onFilterChange);

// ─── Toggle Globe / 2D ──────────────────────────────────────────────────────

const globeBtn = document.getElementById('toggle-globe');
const globeIcon = document.getElementById('toggle-globe-icon');
const mapEl = document.getElementById('map');
const mapEarthEl = document.getElementById('map-earth');

if (globeBtn) {
  globeBtn.addEventListener('click', () => {
    if (currentMode === 'flat') {
      // Passer en mode Globe
      mapEl.style.display = 'none';
      mapEarthEl.classList.add('active');
      initEarthMap('map-earth');
      currentMode = 'earth';
      globeBtn.classList.add('active');
      globeIcon.textContent = '\uD83D\uDDFA';
    } else {
      // Revenir en mode 2D
      destroyEarthMap();
      mapEarthEl.classList.remove('active');
      mapEl.style.display = '';
      currentMode = 'flat';
      globeBtn.classList.remove('active');
      globeIcon.textContent = '\uD83C\uDF0E';
    }
  });
}

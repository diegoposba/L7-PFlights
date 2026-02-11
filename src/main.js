import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import { initMap, applyFilters } from './map.js';
import { ARCHIPELS } from './airports.js';
import { AIRLINES, activeAirlines } from './routes.js';

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

// ─── Gestion des filtres ──────────────────────────────────────────────────────

function onFilterChange() {
  applyFilters({
    showInterIsland: document.getElementById('filter-interisland').checked,
    showInternational: document.getElementById('filter-international').checked,
    selectedAirline: document.getElementById('filter-airline').value,
  });
}

document.getElementById('filter-interisland')?.addEventListener('change', onFilterChange);
document.getElementById('filter-international')?.addEventListener('change', onFilterChange);
document.getElementById('filter-airline')?.addEventListener('change', onFilterChange);

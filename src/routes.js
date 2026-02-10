// Routes aériennes connues en Polynésie française
// Chaque route = { from, to, airline, airlineName, type }
// type: 'interile' ou 'international'

export const AIRLINES = {
  VT: { name: 'Air Tahiti', color: '#2196F3' },
  MY: { name: 'Air Moana', color: '#00BCD4' },
  TN: { name: 'Air Tahiti Nui', color: '#1565C0' },
  BF: { name: 'French Bee', color: '#E91E63' },
  UA: { name: 'United Airlines', color: '#1A237E' },
  LA: { name: 'LATAM Airlines', color: '#D32F2F' },
  NZ: { name: 'Air New Zealand', color: '#0D47A1' },
  HA: { name: 'Hawaiian Airlines', color: '#7B1FA2' },
  QF: { name: 'Qantas', color: '#C62828' },
};

export const routes = [
  // ═══════════════════════════════════════════════════════════════
  // AIR TAHITI (VT) — Réseau inter-îles
  // ═══════════════════════════════════════════════════════════════

  // Société depuis PPT
  { from: 'PPT', to: 'MOZ', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'BOB', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'RFP', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'HUH', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'MAU', airline: 'VT', type: 'interile' },

  // Tuamotu depuis PPT
  { from: 'PPT', to: 'RGI', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'FAV', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'TIH', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'MKP', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'AXR', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'TKP', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'KXU', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'MVT', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'AAA', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'XMH', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'NAU', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'TKV', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'PKP', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'KHZ', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'AHE', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'TKX', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'NIU', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'VHZ', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'FHZ', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'NUK', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'RKA', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'TJN', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'KKR', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'HAO', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'FGU', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'REA', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'TKT', airline: 'VT', type: 'interile' },

  // Marquises depuis PPT
  { from: 'PPT', to: 'NHV', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'AUQ', airline: 'VT', type: 'interile' },

  // Australes depuis PPT
  { from: 'PPT', to: 'TUB', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'RUR', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'RVV', airline: 'VT', type: 'interile' },
  { from: 'PPT', to: 'RMT', airline: 'VT', type: 'interile' },

  // Gambier depuis PPT
  { from: 'PPT', to: 'GMR', airline: 'VT', type: 'interile' },

  // Routes inter-îles (sans passer par PPT)
  { from: 'RFP', to: 'BOB', airline: 'VT', type: 'interile' },
  { from: 'RFP', to: 'HUH', airline: 'VT', type: 'interile' },
  { from: 'RFP', to: 'MAU', airline: 'VT', type: 'interile' },
  { from: 'BOB', to: 'MAU', airline: 'VT', type: 'interile' },
  { from: 'RGI', to: 'TIH', airline: 'VT', type: 'interile' },
  { from: 'RGI', to: 'MVT', airline: 'VT', type: 'interile' },
  { from: 'RGI', to: 'FAV', airline: 'VT', type: 'interile' },
  { from: 'NHV', to: 'AUQ', airline: 'VT', type: 'interile' },
  { from: 'NHV', to: 'UAP', airline: 'VT', type: 'interile' },
  { from: 'NHV', to: 'UAH', airline: 'VT', type: 'interile' },
  { from: 'AUQ', to: 'UAP', airline: 'VT', type: 'interile' },
  { from: 'AUQ', to: 'UAH', airline: 'VT', type: 'interile' },
  { from: 'TUB', to: 'RUR', airline: 'VT', type: 'interile' },
  { from: 'TUB', to: 'RVV', airline: 'VT', type: 'interile' },
  { from: 'RUR', to: 'RMT', airline: 'VT', type: 'interile' },
  { from: 'HAO', to: 'REA', airline: 'VT', type: 'interile' },
  { from: 'HAO', to: 'TKV', airline: 'VT', type: 'interile' },
  { from: 'HAO', to: 'FGU', airline: 'VT', type: 'interile' },
  { from: 'HAO', to: 'TKT', airline: 'VT', type: 'interile' },
  { from: 'FAV', to: 'KHZ', airline: 'VT', type: 'interile' },
  { from: 'FAV', to: 'NIU', airline: 'VT', type: 'interile' },
  { from: 'MKP', to: 'KXU', airline: 'VT', type: 'interile' },
  { from: 'MKP', to: 'TJN', airline: 'VT', type: 'interile' },
  { from: 'TKP', to: 'TKX', airline: 'VT', type: 'interile' },
  { from: 'TKP', to: 'AHE', airline: 'VT', type: 'interile' },
  { from: 'NAU', to: 'PKP', airline: 'VT', type: 'interile' },
  { from: 'NAU', to: 'FHZ', airline: 'VT', type: 'interile' },

  // Air Tahiti Cook Islands
  { from: 'PPT', to: 'RAR', airline: 'VT', type: 'international' },

  // ═══════════════════════════════════════════════════════════════
  // AIR MOANA (MY) — Réseau inter-îles (Société + quelques Tuamotu/Marquises)
  // ═══════════════════════════════════════════════════════════════
  { from: 'PPT', to: 'MOZ', airline: 'MY', type: 'interile' },
  { from: 'PPT', to: 'BOB', airline: 'MY', type: 'interile' },
  { from: 'PPT', to: 'RFP', airline: 'MY', type: 'interile' },
  { from: 'PPT', to: 'HUH', airline: 'MY', type: 'interile' },
  { from: 'PPT', to: 'RGI', airline: 'MY', type: 'interile' },
  { from: 'PPT', to: 'NHV', airline: 'MY', type: 'interile' },
  { from: 'PPT', to: 'AUQ', airline: 'MY', type: 'interile' },

  // ═══════════════════════════════════════════════════════════════
  // AIR TAHITI NUI (TN) — Vols internationaux
  // ═══════════════════════════════════════════════════════════════
  { from: 'PPT', to: 'CDG', airline: 'TN', type: 'international' },
  { from: 'PPT', to: 'LAX', airline: 'TN', type: 'international' },
  { from: 'PPT', to: 'NRT', airline: 'TN', type: 'international' },
  { from: 'PPT', to: 'AKL', airline: 'TN', type: 'international' },
  { from: 'PPT', to: 'SEA', airline: 'TN', type: 'international' },

  // ═══════════════════════════════════════════════════════════════
  // FRENCH BEE (BF) — Vols internationaux
  // ═══════════════════════════════════════════════════════════════
  { from: 'PPT', to: 'CDG', airline: 'BF', type: 'international' },
  { from: 'PPT', to: 'SFO', airline: 'BF', type: 'international' },

  // ═══════════════════════════════════════════════════════════════
  // UNITED AIRLINES (UA)
  // ═══════════════════════════════════════════════════════════════
  { from: 'PPT', to: 'SFO', airline: 'UA', type: 'international' },

  // ═══════════════════════════════════════════════════════════════
  // LATAM AIRLINES (LA)
  // ═══════════════════════════════════════════════════════════════
  { from: 'PPT', to: 'SCL', airline: 'LA', type: 'international' },

  // ═══════════════════════════════════════════════════════════════
  // AIR NEW ZEALAND (NZ)
  // ═══════════════════════════════════════════════════════════════
  { from: 'PPT', to: 'AKL', airline: 'NZ', type: 'international' },

  // ═══════════════════════════════════════════════════════════════
  // HAWAIIAN AIRLINES (HA)
  // ═══════════════════════════════════════════════════════════════
  { from: 'PPT', to: 'HNL', airline: 'HA', type: 'international' },
];

// Routes inter-îles uniquement
export const interIslandRoutes = routes.filter(r => r.type === 'interile');

// Routes internationales uniquement
export const internationalRoutes = routes.filter(r => r.type === 'international');

// Liste des compagnies actives
export const activeAirlines = [...new Set(routes.map(r => r.airline))];

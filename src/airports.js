// Aéroports de Polynésie française + aéroports internationaux connectés
// Coordonnées GPS (longitude, latitude) pour compatibilité GeoJSON/L7

export const ARCHIPELS = {
  SOCIETE: { name: 'Îles de la Société', color: '#4FC3F7' },
  TUAMOTU: { name: 'Tuamotu', color: '#81C784' },
  MARQUISES: { name: 'Îles Marquises', color: '#FFB74D' },
  AUSTRALES: { name: 'Îles Australes', color: '#CE93D8' },
  GAMBIER: { name: 'Îles Gambier', color: '#F06292' },
  INTERNATIONAL: { name: 'International', color: '#FFD54F' },
};

export const airports = [
  // ═══════════════════════════════════════════
  // ÎLES DE LA SOCIÉTÉ
  // ═══════════════════════════════════════════
  { iata: 'PPT', name: "Fa'a'ā International", island: 'Tahiti', archipel: 'SOCIETE', lng: -149.6069, lat: -17.5537, hub: true },
  { iata: 'MOZ', name: "Moorea Temae", island: 'Moorea', archipel: 'SOCIETE', lng: -149.7617, lat: -17.4900 },
  { iata: 'BOB', name: 'Bora Bora Motu Mute', island: 'Bora Bora', archipel: 'SOCIETE', lng: -151.7514, lat: -16.4444 },
  { iata: 'RFP', name: 'Raiatea', island: 'Raiatea', archipel: 'SOCIETE', lng: -151.4661, lat: -16.7228 },
  { iata: 'HUH', name: 'Huahine Fare', island: 'Huahine', archipel: 'SOCIETE', lng: -151.0217, lat: -16.6872 },
  { iata: 'MAU', name: 'Maupiti', island: 'Maupiti', archipel: 'SOCIETE', lng: -152.2436, lat: -16.4264 },
  { iata: 'TTI', name: 'Tetiaroa', island: 'Tetiaroa', archipel: 'SOCIETE', lng: -149.5869, lat: -17.0133 },

  // ═══════════════════════════════════════════
  // TUAMOTU
  // ═══════════════════════════════════════════
  { iata: 'RGI', name: 'Rangiroa', island: 'Rangiroa', archipel: 'TUAMOTU', lng: -147.6608, lat: -14.9542 },
  { iata: 'FAV', name: 'Fakarava', island: 'Fakarava', archipel: 'TUAMOTU', lng: -145.6569, lat: -16.0542 },
  { iata: 'TIH', name: 'Tikehau', island: 'Tikehau', archipel: 'TUAMOTU', lng: -148.2311, lat: -15.1197 },
  { iata: 'MKP', name: 'Makemo', island: 'Makemo', archipel: 'TUAMOTU', lng: -143.6583, lat: -16.5839 },
  { iata: 'AXR', name: 'Arutua', island: 'Arutua', archipel: 'TUAMOTU', lng: -146.6167, lat: -15.2483 },
  { iata: 'TKP', name: 'Takapoto', island: 'Takapoto', archipel: 'TUAMOTU', lng: -145.2458, lat: -14.7094 },
  { iata: 'KXU', name: 'Katiu', island: 'Katiu', archipel: 'TUAMOTU', lng: -144.4031, lat: -16.3394 },
  { iata: 'MVT', name: 'Mataiva', island: 'Mataiva', archipel: 'TUAMOTU', lng: -148.7172, lat: -14.8681 },
  { iata: 'AAA', name: 'Anaa', island: 'Anaa', archipel: 'TUAMOTU', lng: -145.5097, lat: -17.3526 },
  { iata: 'REA', name: 'Reao', island: 'Reao', archipel: 'TUAMOTU', lng: -136.4397, lat: -18.4658 },
  { iata: 'XMH', name: 'Manihi', island: 'Manihi', archipel: 'TUAMOTU', lng: -146.0700, lat: -14.4368 },
  { iata: 'NAU', name: 'Napuka', island: 'Napuka', archipel: 'TUAMOTU', lng: -141.2667, lat: -14.1767 },
  { iata: 'TKV', name: 'Tatakoto', island: 'Tatakoto', archipel: 'TUAMOTU', lng: -138.4453, lat: -17.3553 },
  { iata: 'PKP', name: 'Puka Puka', island: 'Puka Puka', archipel: 'TUAMOTU', lng: -138.8128, lat: -14.8095 },
  { iata: 'KHZ', name: 'Kauehi', island: 'Kauehi', archipel: 'TUAMOTU', lng: -145.1236, lat: -15.7808 },
  { iata: 'AHE', name: 'Ahe', island: 'Ahe', archipel: 'TUAMOTU', lng: -146.2572, lat: -14.4281 },
  { iata: 'TKX', name: 'Takaroa', island: 'Takaroa', archipel: 'TUAMOTU', lng: -145.0247, lat: -14.4556 },
  { iata: 'NIU', name: 'Niau', island: 'Niau', archipel: 'TUAMOTU', lng: -146.3683, lat: -16.1192 },
  { iata: 'VHZ', name: 'Vahitahi', island: 'Vahitahi', archipel: 'TUAMOTU', lng: -138.8536, lat: -18.7803 },
  { iata: 'FHZ', name: 'Fakahina', island: 'Fakahina', archipel: 'TUAMOTU', lng: -140.1647, lat: -15.9922 },
  { iata: 'NUK', name: 'Nukutavake', island: 'Nukutavake', archipel: 'TUAMOTU', lng: -138.7725, lat: -19.2850 },
  { iata: 'RKA', name: 'Aratika', island: 'Aratika', archipel: 'TUAMOTU', lng: -145.4697, lat: -15.4853 },
  { iata: 'TJN', name: 'Takume', island: 'Takume', archipel: 'TUAMOTU', lng: -142.2608, lat: -15.8556 },
  { iata: 'KKR', name: 'Kaukura', island: 'Kaukura', archipel: 'TUAMOTU', lng: -146.8847, lat: -15.6633 },
  { iata: 'HAO', name: 'Hao', island: 'Hao', archipel: 'TUAMOTU', lng: -140.9456, lat: -18.0748 },
  { iata: 'FGU', name: 'Fangatau', island: 'Fangatau', archipel: 'TUAMOTU', lng: -140.8867, lat: -15.8200 },
  { iata: 'TKT', name: 'Tureia', island: 'Tureia', archipel: 'TUAMOTU', lng: -138.5700, lat: -20.7897 },

  // ═══════════════════════════════════════════
  // ÎLES MARQUISES
  // ═══════════════════════════════════════════
  { iata: 'NHV', name: 'Nuku Hiva', island: 'Nuku Hiva', archipel: 'MARQUISES', lng: -140.2289, lat: -8.7956 },
  { iata: 'AUQ', name: 'Hiva Oa', island: 'Hiva Oa', archipel: 'MARQUISES', lng: -139.0114, lat: -9.7689 },
  { iata: 'UAP', name: 'Ua Pou', island: 'Ua Pou', archipel: 'MARQUISES', lng: -140.0778, lat: -9.3517 },
  { iata: 'UAH', name: 'Ua Huka', island: 'Ua Huka', archipel: 'MARQUISES', lng: -139.5522, lat: -8.9361 },

  // ═══════════════════════════════════════════
  // ÎLES AUSTRALES
  // ═══════════════════════════════════════════
  { iata: 'TUB', name: 'Tubuai Mataura', island: 'Tubuai', archipel: 'AUSTRALES', lng: -149.5244, lat: -23.3654 },
  { iata: 'RUR', name: 'Rurutu', island: 'Rurutu', archipel: 'AUSTRALES', lng: -151.3611, lat: -22.4340 },
  { iata: 'RVV', name: 'Raivavae', island: 'Raivavae', archipel: 'AUSTRALES', lng: -147.6622, lat: -23.8852 },
  { iata: 'RMT', name: 'Rimatara', island: 'Rimatara', archipel: 'AUSTRALES', lng: -152.8056, lat: -22.6372 },

  // ═══════════════════════════════════════════
  // ÎLES GAMBIER
  // ═══════════════════════════════════════════
  { iata: 'GMR', name: 'Totegegie', island: 'Gambier', archipel: 'GAMBIER', lng: -134.8903, lat: -23.0800 },

  // ═══════════════════════════════════════════
  // AÉROPORTS INTERNATIONAUX CONNECTÉS
  // ═══════════════════════════════════════════
  { iata: 'CDG', name: 'Paris Charles de Gaulle', island: 'France', archipel: 'INTERNATIONAL', lng: 2.5479, lat: 49.0097 },
  { iata: 'LAX', name: 'Los Angeles International', island: 'USA', archipel: 'INTERNATIONAL', lng: -118.4085, lat: 33.9416 },
  { iata: 'SFO', name: 'San Francisco International', island: 'USA', archipel: 'INTERNATIONAL', lng: -122.3750, lat: 37.6213 },
  { iata: 'NRT', name: 'Tokyo Narita', island: 'Japon', archipel: 'INTERNATIONAL', lng: -219.6071, lat: 35.7647 },
  { iata: 'AKL', name: 'Auckland International', island: 'Nouvelle-Zélande', archipel: 'INTERNATIONAL', lng: -185.2150, lat: -37.0082 },
  { iata: 'SYD', name: 'Sydney Kingsford Smith', island: 'Australie', archipel: 'INTERNATIONAL', lng: -208.8228, lat: -33.9461 },
  { iata: 'SCL', name: 'Santiago Arturo Merino', island: 'Chili', archipel: 'INTERNATIONAL', lng: -70.7858, lat: -33.3930 },
  { iata: 'RAR', name: 'Rarotonga International', island: 'Îles Cook', archipel: 'INTERNATIONAL', lng: -159.8058, lat: -21.2028 },
  { iata: 'SEA', name: 'Seattle-Tacoma', island: 'USA', archipel: 'INTERNATIONAL', lng: -122.3088, lat: 47.4502 },
  { iata: 'HNL', name: 'Honolulu Daniel K. Inouye', island: 'Hawaï', archipel: 'INTERNATIONAL', lng: -157.9225, lat: 21.3187 },
];

// Index rapide par code IATA
export const airportByIata = Object.fromEntries(airports.map(a => [a.iata, a]));

// Aéroports PF uniquement
export const pfAirports = airports.filter(a => a.archipel !== 'INTERNATIONAL');

// Aéroports internationaux uniquement
export const intlAirports = airports.filter(a => a.archipel === 'INTERNATIONAL');

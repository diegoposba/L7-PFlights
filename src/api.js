// Module API AviationStack — plan gratuit (100 req/mois, HTTP uniquement)
// Cache localStorage avec TTL 24h

const BASE_URL = 'http://api.aviationstack.com/v1';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 heures

function getCacheKey(endpoint, params) {
  return `avstack_${endpoint}_${JSON.stringify(params)}`;
}

function getFromCache(key) {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function saveToCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // localStorage plein — on ignore
  }
}

async function apiCall(apiKey, endpoint, params = {}) {
  const cacheKey = getCacheKey(endpoint, params);
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const queryString = new URLSearchParams({ access_key: apiKey, ...params }).toString();
  const url = `${BASE_URL}/${endpoint}?${queryString}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(`AviationStack: ${result.error.message || result.error.info}`);
  }

  saveToCache(cacheKey, result);
  return result;
}

/**
 * Récupère les vols en temps réel depuis/vers un aéroport
 * @param {string} apiKey - Clé API AviationStack
 * @param {object} options - { dep_iata, arr_iata }
 * @returns {Promise<Array>} Liste des vols
 */
export async function fetchFlights(apiKey, { dep_iata, arr_iata } = {}) {
  const params = {};
  if (dep_iata) params.dep_iata = dep_iata;
  if (arr_iata) params.arr_iata = arr_iata;

  const result = await apiCall(apiKey, 'flights', params);
  return result.data || [];
}

/**
 * Charge les vols depuis PPT (hub principal) — 2 requêtes API
 * Retourne les routes uniques découvertes
 */
export async function fetchPPTFlights(apiKey) {
  const [departures, arrivals] = await Promise.all([
    fetchFlights(apiKey, { dep_iata: 'PPT' }),
    fetchFlights(apiKey, { arr_iata: 'PPT' }),
  ]);

  const allFlights = [...departures, ...arrivals];
  const discoveredRoutes = new Map();

  for (const flight of allFlights) {
    const dep = flight.departure?.iata;
    const arr = flight.arrival?.iata;
    const airlineIata = flight.airline?.iata;

    if (!dep || !arr) continue;

    const key = `${dep}-${arr}-${airlineIata || 'XX'}`;
    if (!discoveredRoutes.has(key)) {
      discoveredRoutes.set(key, {
        from: dep,
        to: arr,
        airline: airlineIata || 'XX',
        airlineName: flight.airline?.name || 'Inconnu',
        flightNumber: flight.flight?.iata || '',
        status: flight.flight_status || '',
        type: dep === 'PPT' || arr === 'PPT'
          ? (isInternational(dep, arr) ? 'international' : 'interile')
          : 'interile',
      });
    }
  }

  return Array.from(discoveredRoutes.values());
}

function isInternational(dep, arr) {
  const pfCodes = new Set([
    'PPT','MOZ','BOB','RFP','HUH','MAU','TTI',
    'RGI','FAV','TIH','MKP','AXR','TKP','KXU','MVT','AAA','REA','XMH','NAU',
    'TKV','PKP','KHZ','AHE','TKX','NIU','VHZ','FHZ','NUK','RKA','TJN','KKR',
    'HAO','FGU','TKT',
    'NHV','AUQ','UAP','UAH',
    'TUB','RUR','RVV','RMT',
    'GMR',
  ]);
  return !pfCodes.has(dep) || !pfCodes.has(arr);
}

/**
 * Vide le cache AviationStack
 */
export function clearCache() {
  const keys = Object.keys(localStorage);
  for (const key of keys) {
    if (key.startsWith('avstack_')) {
      localStorage.removeItem(key);
    }
  }
}

const BASE_URL = "https://api.jikan.moe/v4";

// Rate limit handling: 3 requests per second
let lastRequestTime = 0;
const MIN_DELAY = 350;

async function fetchWithDelay(url: string) {
  const now = Date.now();
  const timeSinceLast = now - lastRequestTime;
  if (timeSinceLast < MIN_DELAY) {
    await new Promise((resolve) => setTimeout(resolve, MIN_DELAY - timeSinceLast));
  }
  lastRequestTime = Date.now();
  
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 429) {
      // Too many requests, wait longer and retry once
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchWithDelay(url);
    }
    throw new Error(`Jikan API Error: ${res.status}`);
  }
  return res.json();
}

export async function getTopAiring() {
  return fetchWithDelay(`${BASE_URL}/top/anime?filter=airing&limit=10`);
}

export async function getTrending() {
  return fetchWithDelay(`${BASE_URL}/top/anime?filter=bypopularity&limit=20`);
}

export async function getTopMovies() {
  return fetchWithDelay(`${BASE_URL}/top/anime?type=movie&limit=20`);
}

export async function getAnimeDetails(id: string | number) {
  return fetchWithDelay(`${BASE_URL}/anime/${id}/full`);
}

export async function getAnimeCharacters(id: string | number) {
  return fetchWithDelay(`${BASE_URL}/anime/${id}/characters`);
}

export async function getTopCharacters() {
  return fetchWithDelay(`${BASE_URL}/top/characters?limit=24`);
}

export async function getCurrentSeason() {
  return fetchWithDelay(`${BASE_URL}/seasons/now?limit=20`);
}

export async function searchAnime(query: string, genres?: string) {
  let url = `${BASE_URL}/anime?q=${encodeURIComponent(query)}&sfw=true`;
  if (genres) url += `&genres=${genres}`;
  return fetchWithDelay(url);
}

export async function getGenres() {
  return fetchWithDelay(`${BASE_URL}/genres/anime`);
}

export async function getAnimeRecommendations(id: string | number) {
  return fetchWithDelay(`${BASE_URL}/anime/${id}/recommendations`);
}

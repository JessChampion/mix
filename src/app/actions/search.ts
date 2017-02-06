export const SEARCH_SPOTIFY = 'SEARCH_SPOTIFY';
export function searchSpotify(query: string) {
  return {
    type: SEARCH_SPOTIFY,
    query
  };
}

export const SEARCH_RESULTS = 'SEARCH_RESULTS';
export function searchResults(data: any) {
  return {
    type: SEARCH_RESULTS,
    data
  };
}
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export function incrementCounter() {
  return {
    type: INCREMENT_COUNTER
  };
}

export const LOGIN_WITH_SPOTIFY = 'LOGIN_WITH_SPOTIFY';
export function loginWithSpotify() {
  return {
    type: LOGIN_WITH_SPOTIFY
  };
}

export const LOGGED_IN_WITH_SPOTIFY = 'LOGGED_IN_WITH_SPOTIFY';
export function loggedInWithSpotify(token: string) {
  return {
    type: LOGGED_IN_WITH_SPOTIFY,
    token
  };
}

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

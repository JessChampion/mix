export const LOGIN = 'LOGIN';
export function login() {
  return {
    type: LOGIN
  };
}

export const LOGGED_IN_WITH_SPOTIFY = 'LOGGED_IN_WITH_SPOTIFY';
export function loggedInWithSpotify(token: string) {
  return {
    type: LOGGED_IN_WITH_SPOTIFY,
    token
  };
}

export const LOGGED_IN_WITH_LOCAL_STORAGE = 'LOGGED_IN_WITH_LOCAL_STORAGE';
export function loggedInWithLocalStorage(token: string, expiries: number) {
  return {
    type: LOGGED_IN_WITH_LOCAL_STORAGE,
    token
  };
}

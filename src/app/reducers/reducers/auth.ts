import * as R from 'ramda';
import {
  LOGGED_IN_WITH_LOCAL_STORAGE,
  LOGGED_IN_WITH_SPOTIFY,
  loggedInWithLocalStorage,
  LOGIN
} from '../../actions/auth';
import store from '../../store';

const CLIENT = 'dc741732cf0245dea66f6d4a47a65f06';
const AUTH = 'https://accounts.spotify.com/authorize';
const BASE = 'http://localhost:3000/';
const REDIRECT = 'login#';
const LS_KEYS = {
  expires: 'expires',
  token: 'token'
};

const removeHash = (str) => str.substring(1);
const splitByAnd = R.split('&');
const splitByEquals = R.map(R.split('='));
const flatten = R.map((item: string[]) => {
  return R.set(R.lensProp(item[0]), item[1], {});
});

const splitParams = R.compose(R.mergeAll, flatten, splitByEquals, splitByAnd, removeHash);
const joinParams = R.join('&');

export interface IAuthState {
  token: string;
  expires?: number;
}

export default function authReducer(state: IAuthState = {token: null}, action): IAuthState {
  switch (action.type) {
    case LOGIN:
      login();
      break;
    case LOGGED_IN_WITH_SPOTIFY: {
      let params = loggedIn(window.location.hash);
      state.token = params.token;
      state.expires = params.expires;
      return state;
    }
    case LOGGED_IN_WITH_LOCAL_STORAGE: {
      state.token = action.token;
      state.expires = action.expires;
      return state;
    }
  }
  return state;
}

function login() {
  // Check local storage
  let local = getAuthfromLocalStorage();
  if (local) {
    let {token, expires} = local;
    if (checkExprity(expires)) {
      //noinspection TypeScriptValidateTypes
      store.dispatch(loggedInWithLocalStorage(token, expires));
      return;
    }
  }
  console.log('Redirect to login with spotify');
  window.location.href = getLoginURL();
}

function checkExprity(expires: number) {
  return (expires > Date.now());
}

function getLoginURL() {
  // 'user-library-read user-read-private'
  let scopes = 'scope=' + encodeURIComponent('user-library-read');
  let params = joinParams([
    ('client_id=' + CLIENT),
    scopes,
    'response_type=token',
    'state=login',
    'redirect_uri=' + BASE + REDIRECT
  ]);
  return AUTH + '?' + encodeURI(params);
}

function loggedIn(params: string) {
  let response: any = splitParams(params);
  let token: string = response.access_token;
  let expires: number = getExpiryFrom(response.expires_in);
  setAuthInLocalStorage(token, expires);
  return {
    expires,
    token
  };
}

function getExpiryFrom(offset: string) {
  return Date.now() + parseInt(offset, 10);
}

function setAuthInLocalStorage(token, expires) {
  localStorage.setItem(LS_KEYS.token, token);
  localStorage.setItem(LS_KEYS.expires, expires);
}

function getAuthfromLocalStorage() {
  let token: string = localStorage.getItem(LS_KEYS.token);
  let expires: number = localStorage.getItem(LS_KEYS.expires);
  return (token && expires) ? {expires, token} : null;
}

import * as R from 'ramda';
import { Router } from 'react-router';

import {LOGGED_IN_WITH_SPOTIFY, LOGIN_WITH_SPOTIFY} from '../../actions/index';

const CLIENT = 'dc741732cf0245dea66f6d4a47a65f06';
const AUTH = 'https://accounts.spotify.com/authorize';
const BASE = 'http://localhost:3000/';
const REDIRECT = 'login#';

const removeHash = (str) => str.substring(1);
const splitByAnd = R.split('&');
const splitByEquals = R.map(R.split('='));
const splitParams = R.compose(splitByEquals, splitByAnd, removeHash);
const joinParams = R.join('&');

export interface IAuthState {
  token: string;
  expires?: number;
}

export default function authReducer(state: IAuthState = {token: null}, action): IAuthState {
  switch (action.type) {
    case LOGIN_WITH_SPOTIFY:
      redirectToLoginWithSpotify(); break;
    case LOGGED_IN_WITH_SPOTIFY: {
      console.log('LOGGED_IN_WITH_SPOTIFY: ' + JSON.stringify(action));
      console.log('LOGGED_IN_WITH_SPOTIFY state: ' + JSON.stringify(state));
      return loggedIn(window.location.hash, state);
    }
  }
  return state;
}

function redirectToLoginWithSpotify() {
  console.log('Redirect to login with spotify');
  window.location.href = getLoginURL();
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

function loggedIn(params: string, state: any) {
  let response: any = splitParams(params);
  state.token = response.token;
  state.expires = getExpiryFrom(Date.now(), response.expires_in);
  console.log('LOGGED IN STATE: ' + JSON.stringify(state));
  // TODO: use react router
  window.setTimeout(() => window.location.href = BASE, 1000);
  return state;
}

function getExpiryFrom(now: number, offset: string) {
  return now + offset;
}

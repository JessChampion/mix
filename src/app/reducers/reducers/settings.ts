import * as fetch from 'isomorphic-fetch';
import * as R from 'ramda';
import {browserHistory}  from 'react-router';

import {recievedMix} from '../../actions/play';
import {ADD_SEED, CREATE_MIX, LOADED_THUMBNAIL, REMOVE_SEED} from '../../actions/settings';
import store from '../../store';
import {loadThumbnail} from '../../utils/SpotifyParser';

const BASE = 'http://localhost:3000/';
const MAX_SEEDS = 5;
const MIN_POPULARITY = 50;
const RECOMMENDATIONS = 'https://api.spotify.com/v1/recommendations?';
const KEYS = {
  POPULARITY: '&min_popularity=',
  SEEDS: 'seed_tracks='
};

const findIndexById = R.curry((id: string, seeds: any[]) => {
  return R.findIndex(R.propEq('id', id))(seeds);
});
const hasSeed = (id: string, seeds: any[]) => {
  return findIndexById(id, seeds) >= 0;
};
const removeAtIndex = R.curry((index: number, seeds: any[]) => R.remove(index, 1, seeds));
const getSeedString = R.compose(R.join(','), R.pluck('id'));
const getToken = R.path(['auth', 'token']);
const getRecommendationsURL = (seeds) => R.join('', [
  RECOMMENDATIONS, KEYS.SEEDS,
  getSeedString(seeds),
  KEYS.POPULARITY,
  MIN_POPULARITY]);

export interface ISettingsState {
  seeds: any[];
  seedError: string;
}

export default function settingsReducer(state: ISettingsState = {seeds: [], seedError: null},
                                        action): ISettingsState {
  switch (action.type) {
    case ADD_SEED: {
      if (!state.seeds) {
        state.seeds = [];
      }
      if (state.seeds.length < MAX_SEEDS) {
        state.seedError = null;
        let seed = action.track;
        if (hasSeed(seed.id, state.seeds) === false) {
          state.seeds.push(seed);
          loadThumbnail(seed.id, seed.href);
        }
      } else {
        state.seedError = 'MAX_' + MAX_SEEDS;
      }
      return state;
    }
    case LOADED_THUMBNAIL: {
      let index: number = findIndexById(action.id, state.seeds);
      if (index >= 0) {
        state.seeds[index].imageUrl = action.imageUrl;
      }
      return state;
    }
    case REMOVE_SEED: {
      let index: number = findIndexById(action.id, state.seeds);
      if (index >= 0) {
        state.seeds = removeAtIndex(index, state.seeds);
      }
      return state;
    }
    case CREATE_MIX: {
      console.log(JSON.stringify(state.seeds));
      createAMix(state.seeds);
      return state;
    }
  }
  return state;
}

async function createAMix(seeds: any[]) {
  let token = getToken(store.getState());
  if (!token) { // TODO: check tocken expiry
    browserHistory.push('/login');
  }
  let request = new Request(getRecommendationsURL(seeds), {
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    })
  });
  let response: any = await fetch(request);
  if (response.status === 401) {
    browserHistory.push('/login');
  } else if (response.status >= 400) {
    console.log(JSON.stringify(response));
    throw new Error('Bad response from server: ' + JSON.stringify(response));
  }
  let data = await response.json();
  //noinspection TypeScriptValidateTypes
  store.dispatch(recievedMix(data));
}

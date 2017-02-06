import { browserHistory } from 'react-router';
import * as fetch from 'isomorphic-fetch';
import * as R from 'ramda';

import {ADD_SEED, CREATE_MIX, LOADED_THUMBNAIL, loadedThumbnail, REMOVE_SEED} from '../../actions/settings';
import {recievedMix} from '../../actions/play';
import store from '../../store';
const BASE = 'http://localhost:3000/';
const MAX_SEEDS = 5;
const MIN_POPULARITY = 50;
const RECOMMENDATIONS = 'https://api.spotify.com/v1/recommendations?';

const getThumbnail = R.compose(R.find(R.propEq('height', 300)), R.path(['album', 'images']));
const findIndexById = R.curry((id: string, seeds: any[]) => {
  return R.findIndex(R.propEq('id', id))(seeds);
});
const hasSeed = (id: string, seeds: any[]) => {
  return findIndexById(id, seeds) >= 0;
};
const removeAtIndex = R.curry((index: number, seeds: any[]) => R.remove(index, 1, seeds));
const getSeedString = R.compose(R.join(','), R.pluck('id'));
const getToken = R.path(['auth', 'token']);

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

async function loadThumbnail(id: number, url: string) {
  console.log(url);
  let response: any = await fetch(url);
  if (response.status >= 400) {
    console.log(JSON.stringify(response));
    throw new Error('Bad response from server');
  }
  let data = await response.json();
  return parseResults(id, data);
}

function parseResults(id, response) {
  let imageUrl = getThumbnail(response).url;
  console.log(JSON.stringify(imageUrl));
  //noinspection TypeScriptValidateTypes
  store.dispatch(loadedThumbnail(id, imageUrl));
}

async function createAMix(seeds: any[]) {
  let token = getToken(store.getState());
  if (!token) {
    // TODO: use react router
    window.setTimeout(() => window.location.href = BASE + 'login', 1000);
  }
  let request = new Request(getRecommendationsURL(seeds), {
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    })
  });
  let response: any = await fetch(request);
  if (response.status >= 400) {
    console.log(JSON.stringify(response));
    throw new Error('Bad response from server');
  }
  let data = await response.json();
  //noinspection TypeScriptValidateTypes
  store.dispatch(recievedMix(data));
  browserHistory.push('/play');
}

function getRecommendationsURL(seeds) {
  return RECOMMENDATIONS +
    'seed_tracks=' + getSeedString(seeds)
    + '&min_popularity=' + MIN_POPULARITY;
}


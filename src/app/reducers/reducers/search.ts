import * as fetch from 'isomorphic-fetch';
import * as R from 'ramda';

import {SEARCH_RESULTS, SEARCH_SPOTIFY, searchResults} from '../../actions/index';
import store from '../../store';

const SEARCH = 'https://api.spotify.com/v1/search';

const getTracks = R.path(['tracks', 'items']);
const getTrackDetails = R.pickAll(['id', 'name', 'href']);
const getArtist = R.path(['artists', '0', 'name']);

export interface ISearchState {
  searchResults: any;
}

export default function searchReducer(state: ISearchState = {searchResults: []}, action): ISearchState {
  switch (action.type) {
    case SEARCH_SPOTIFY: {
      doSpotifySearch(action.query);
      state.searchResults = {loading: true};
      return state;
    }
    case SEARCH_RESULTS: {
      state.searchResults = {
        data: action.data,
        loading: false
      };
      return state;
    }
  }
  return state;
}

function doSpotifySearch(query) {
  let url = SEARCH + '?q=' + encodeURI(query) + '&type=track';
  console.log(url);
  search(url).then((data) => {
    console.log('DATA: ' + JSON.stringify(data));
    //noinspection TypeScriptValidateTypes
    store.dispatch(searchResults(data));
  });
}

async function search(url) {
  let response: any = await fetch(url);
  if (response.status >= 400) {
    console.log(JSON.stringify(response));
    throw new Error('Bad response from server');
  }
  let data = await response.json();
  return parseResults(data);
}

function parseResults(response) {
  let results: any = getTracks(response);
  results = R.map((item: any) => {
    let track = getTrackDetails(item);
    let artist = {artist: getArtist(item)};
    return R.merge(artist, track);
  }, results);
  return results;
}

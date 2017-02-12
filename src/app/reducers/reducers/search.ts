import * as fetch from 'isomorphic-fetch';
import * as R from 'ramda';

import {SEARCH_RESULTS, SEARCH_SPOTIFY, searchResults} from '../../actions/search';
import store from '../../store';
import {parseTracksResult} from '../../utils/SpotifyParser';

const SEARCH = 'https://api.spotify.com/v1/search';

const getTracks = R.path(['tracks', 'items']);
const parseResults = R.compose(parseTracksResult, getTracks);

const getUrl = (query) => SEARCH + '?q=' + encodeURI(query) + '&type=track';
const searchURL = async (url) => {
  let response: any = await fetch(url);
  if (response.status >= 400) {
    console.log(JSON.stringify(response));
    throw new Error('Bad response from server');
  }
  return parseResults(await response.json());
};

const search = R.compose(searchURL, getUrl);

const doSpotifySearch = (query) => {
  search(query).then((data) => {
    console.log('DATA: ' + JSON.stringify(data));
    //noinspection TypeScriptValidateTypes
    store.dispatch(searchResults(data));
  });
};

export interface ISearchState {
  searchResults: any;
}

const searchReducer = (state: ISearchState = {searchResults: []}, action): ISearchState => {
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
};

export default searchReducer;

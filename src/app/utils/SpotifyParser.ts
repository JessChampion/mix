import * as R from 'ramda';

import {loadedThumbnail} from '../actions/settings';
import store from '../store';

const getTrackDetails = R.pickAll(['id', 'name', 'href']);
const getArtist = R.path(['artists', '0', 'name']);
const getThumbnail = R.compose(R.find(R.propEq('height', 300)), R.path(['album', 'images']));

export function parseTracksResult(tracks: any) {
  tracks = R.map((item: any) => {
    let track = getTrackDetails(item);
    let artist = {artist: getArtist(item)};
    return R.merge(artist, track);
  }, tracks);
  return tracks;
}

export async function loadThumbnail(id: number, url: string) {
  console.log(url);
  let response: any = await fetch(url);
  if (response.status >= 400) {
    console.log(JSON.stringify(response));
    throw new Error('Bad response from server');
  }
  let data = await response.json();
  return parseThumbnailResults(id, data);
}

function parseThumbnailResults(id, response) {
  let imageUrl = getThumbnail(response).url;
  console.log(JSON.stringify(imageUrl));
  //noinspection TypeScriptValidateTypes
  store.dispatch(loadedThumbnail(id, imageUrl));
}

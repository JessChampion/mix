import * as R from 'ramda';

const getTrackDetails = R.pickAll(['id', 'name', 'href']);
const getArtist = R.path(['artists', '0', 'name']);

export function parseTracksResult(tracks: any) {
  tracks = R.map((item: any) => {
    let track = getTrackDetails(item);
    let artist = {artist: getArtist(item)};
    return R.merge(artist, track);
  }, tracks);
  return tracks;
}

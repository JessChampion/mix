// import * as fetch from 'isomorphic-fetch';
import * as R from 'ramda';
import {RECIEVED_MIX} from '../../actions/play';
import {parseTracksResult} from '../../utils/SpotifyParser';

const getTrackObject = R.path(['tracks']);

export interface IPlayState {
  mix: any;
}

export default function playReducer(state: IPlayState = {mix: {}}, action): IPlayState {
  switch (action.type) {
    case RECIEVED_MIX: {
      state.mix = parseResults(action.mix);
      return state;
    }
  }
  return state;
}

function parseResults(playlist: any[]) {
  return R.compose(parseTracksResult, R.path(['tracks']))(playlist);
}

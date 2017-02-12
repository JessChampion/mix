// import * as fetch from 'isomorphic-fetch';
import * as R from 'ramda';
import {RECIEVED_MIX, PRUNE_MIX} from '../../actions/play';
import {parseTracksResult} from '../../utils/SpotifyParser';

const getTrackObject = R.path(['tracks']);
const parseResults = R.compose(parseTracksResult, getTrackObject);
const removeTrack = (trackId, mix) => R.reject(R.propEq('id', trackId), mix);

export interface IPlayState {
  mix: any;
}

export default function playReducer(state: IPlayState = {mix: {}}, action): IPlayState {
  switch (action.type) {
    case RECIEVED_MIX: {
      state.mix = parseResults(action.mix);
      return state;
    }
    case PRUNE_MIX: {
      state.mix = removeTrack(action.trackID, state.mix);
      return state;
    }
  }
  return state;
}




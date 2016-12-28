import {INCREMENT_COUNTER} from '../../actions/index';

export interface ISampleState {
  counter: number;
}

export default function sampleReducer(state: ISampleState = {counter: 0}, action): ISampleState {
  switch (action.type) {
    case INCREMENT_COUNTER: {
      state.counter = state.counter + 1;
      return state;
    }
  }
  return state;
}

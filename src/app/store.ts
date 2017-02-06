import {combineReducers, createStore, Store} from 'redux';
import * as reducers from './reducers';
import {loadStateFromStore, saveStateToStore} from './utils/LocalStorage';

const rootReducer = combineReducers(reducers as any); // ES6 trick

const initialState = loadStateFromStore() || {};

const store = createStore(
  rootReducer,
  initialState
);

store.subscribe(() => {
  // Log the state whenever the store changes.
  let state = store.getState();
  console.log(state);
  saveStateToStore(state);
});

export default store;

import {combineReducers, createStore, Store} from 'redux';
import * as reducers from './reducers';

const rootReducer = combineReducers(reducers as any); // ES6 trick
const store = createStore(rootReducer);

store.subscribe(() => {
  // Log the state whenever the store changes.
  console.log(store.getState());
});

export default store;

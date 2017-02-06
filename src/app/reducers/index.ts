import {Store} from 'redux';

import {IAuthState} from './reducers/auth';
import {IPlayState} from './reducers/play';
import {ISearchState} from './reducers/search';
import {ISettingsState} from './reducers/settings';

//
// Store interfaces
//
// The interfaces may be used by reducers to help enforce type safety.
// They may also be used by components that have state mappers that
// subscribe to store changes.
//

export interface IStore {
  auth: IAuthState;
  search: ISearchState;
  settings: ISettingsState;
  play: IPlayState;
}

export interface IStoreContext { store: Store<any>;
}

export {default as auth} from './reducers/auth';
export {default as search} from './reducers/search';
export {default as settings} from './reducers/settings';
export {default as play} from './reducers/play';

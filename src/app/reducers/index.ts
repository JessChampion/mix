import {Store} from 'redux';

import {IAuthState} from './reducers/auth';
import {IMainState} from './reducers/main';
import {IPlayState} from './reducers/play';
import {ISearchState} from './reducers/search';
import {ISettingsState} from './reducers/settings';

export interface IStore {
  auth: IAuthState;
  main: IMainState;
  search: ISearchState;
  settings: ISettingsState;
  play: IPlayState;
}

export interface IStoreContext { store: Store<any>;
}

export {default as auth} from './reducers/auth';
export {default as main} from './reducers/main';
export {default as search} from './reducers/search';
export {default as settings} from './reducers/settings';
export {default as play} from './reducers/play';

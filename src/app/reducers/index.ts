import {Store} from 'redux';

import {IAuthState} from './reducers/auth';
import {ISampleState} from './reducers/sample';
import {ISearchState} from './reducers/search';

//
// Store interfaces
//
// The interfaces may be used by reducers to help enforce type safety.
// They may also be used by components that have state mappers that
// subscribe to store changes.
//

export interface IStore {
  auth: IAuthState;
  sample: ISampleState;
  search: ISearchState;
}

export interface IStoreContext { store: Store<any>;
}

export {default as sample} from './reducers/sample';
export {default as auth} from './reducers/auth';
export {default as search} from './reducers/search';

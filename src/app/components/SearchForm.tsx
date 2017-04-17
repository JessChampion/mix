import * as R from 'ramda';
import * as React from 'react';
import {searchSpotify} from '../actions/search';
import {IStore, IStoreContext} from '../reducers';
import {ISearchState} from '../reducers/reducers/search';

const getSearchInput = R.pathOr('N/A', ['target', '0', 'value']);

// The mapping function tailors the store's state to the view's state.
function mapStateFromStore(store: IStore): ISearchState {
  return {
    searchResults: store.search.searchResults
  };
}

export default class SearchForm extends React.Component<any, any> {
  static contextTypes: React.ValidationMap<any> = {
    store: React.PropTypes.object
  };

  context: IStoreContext;
  unsubscribe: Function;

  constructor(props: any) {
    super(props);
    if (!this.state) {
      this.state = {searchResults: {loading: false}};
    }
  }

  componentDidMount() {
    // This helper wraps common code so we can initialze state and then subscribe.
    this.setStateFromStore();
    this.unsubscribe = this.context.store.subscribe(this.setStateFromStore.bind(this));
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  setStateFromStore() {
    this.setState(mapStateFromStore(this.context.store.getState()));
  }

  submitSearch(evt) {
    evt.preventDefault();
    let query = getSearchInput(evt);
    //noinspection TypeScriptValidateTypes
    this.context.store.dispatch(searchSpotify(query));
  }

  render() {
    return (
      <div>
        <form className="searchForm"
              onSubmit={(evt) => this.submitSearch(evt)}
        >
          <input className="searchBox"
                 type="text"
                 placeholder="Add seed tracks"
                 name="searchQuery"
          />
          <input type="submit"
                 value="Search"
                 className="button"
          />
        </form>
      </div>
    );
  }
};

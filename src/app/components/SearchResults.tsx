import * as React from 'react';
import {IStore, IStoreContext} from '../reducers';
import {ISearchState} from '../reducers/reducers/search';

// The mapping function tailors the store's state to the view's state.
function mapStateFromStore(store: IStore): ISearchState {
  return {
    searchResults: store.search.searchResults
  };
}

export default class SearchResults extends React.Component<any, any> {
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

  render() {
    let loadingResults = this.state.searchResults.loading;
    let results = this.state.searchResults.data;
    if (loadingResults) {
      return (
        <div>
          <div className="searchResults">
            <h2 className="heading">Add seed tracks</h2>
            <div>loading...</div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="searchResults">
          <h2 className="heading">Add seed tracks</h2>
          {JSON.stringify(results)}
        </div>
      </div>
    );
  }
};

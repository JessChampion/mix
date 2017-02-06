import * as React from 'react';
import {addSeed} from '../actions/settings';
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

  addSeedTrack(result) {
    //noinspection TypeScriptValidateTypes
    this.context.store.dispatch(addSeed(result));
  }

  renderLoading() {
    return (
      <div className="searchResults">
        <h2 className="heading">Add seed tracks</h2>
        <div className="resultsHolder">
          <div>loading...</div>
        </div>
      </div>
    );
  }

  renderResults(results: any) {
    return (
      <div className="searchResults">
        <div className="resultsHolder">
          {results.map((item, index) => this.renderResult(item, index))}
        </div>
      </div>
    );
  }

  renderResult(result: any, index: number) {
    return (
      <div className="result"
           key={index}
           onClick={this.addSeedTrack.bind(this, result)}>
          <div className="details">
            {/*<i className="fa fa-music" aria-hidden="true"/>*/}
            <span className="track">{result.name}</span>
            <span className="artist">{result.artist}</span>
          </div>
      </div>
    );
  }

  render() {
    let {data, loading} = this.state.searchResults;
    let content = null;
    if (loading) {
      content = this.renderLoading();
    }
    if (data) {
      content = this.renderResults(data);
    }

    return (
      <div>
        {content}
      </div>
    );
  }
};

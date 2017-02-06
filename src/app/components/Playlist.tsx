import * as React from 'react';
import {addSeed} from '../actions/settings';
import {IStore, IStoreContext} from '../reducers';
import {IPlayState} from '../reducers/reducers/play';

// The mapping function tailors the store's state to the view's state.
function mapStateFromStore(store: IStore): IPlayState {
  return {
    mix: store.play.mix
  };
}

export default class Playlist extends React.Component<any, any> {
  static contextTypes: React.ValidationMap<any> = {
    store: React.PropTypes.object
  };

  context: IStoreContext;
  unsubscribe: Function;

  constructor(props: any) {
    super(props);
    if (!this.state) {
      this.state = {mix: []};
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

  renderLoading() {
    return (
      <div className="playlist">
        <div className="playlistHolder">
          <div>loading...</div>
        </div>
      </div>
    );
  }

  renderResults(mix: any) {
    return (
      <div className="playlist">
        <div className="playlistHolder">
          {JSON.stringify(mix, null, 2)};
        </div>
      </div>
    );
  }

  render() {
    let {mix} = this.state;
    let content = (!this.state.mix || this.state.mix.length <= 0) ?
    this.renderLoading() : this.renderResults(mix);

    return (
      <div>
        {content}
      </div>
    );
  }
};

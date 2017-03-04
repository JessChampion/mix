import * as React from 'react';
import {pruneMix} from '../actions/play';
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

  removeTrack(trackId) {
    //noinspection TypeScriptValidateTypes
    this.context.store.dispatch(pruneMix(trackId));
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

  renderTrack(song, index) {
    return (
      <div className="song" key={song.id}>
        <span className="songNumber">{index + 1}</span>
        <span className="name">{song.name}</span>
        <span className="artist">{song.artist}</span>
        <span className="close" onClick={this.removeTrack.bind(this, song.id)}>x</span>
      </div>
    );
  }

  renderTracks(mix: any) {
    return (
      <div className="playlist">
        <div className="playlistHolder">
          {mix.map((item, index) => this.renderTrack(item, index))}
        </div>
      </div>
    );
  }

  render() {
    let {mix} = this.state;
    let content = (!this.state.mix || this.state.mix.length <= 0) ?
    this.renderLoading() : this.renderTracks(mix);

    return (<div>{content}</div>);
  }
};

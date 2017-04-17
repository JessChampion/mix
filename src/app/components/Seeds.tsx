import * as React from 'react';
import {removeSeed} from '../actions/settings';
import {IStore, IStoreContext} from '../reducers';
import {ISettingsState} from '../reducers/reducers/settings';

// The mapping function tailors the store's state to the view's state.
function mapStateFromStore(store: IStore): ISettingsState {
  return {
    seedError: store.settings.seedError,
    seeds: store.settings.seeds
  };
}

export default class Seeds extends React.Component<any, any> {
  static contextTypes: React.ValidationMap<any> = {
    store: React.PropTypes.object
  };

  context: IStoreContext;
  unsubscribe: Function;

  constructor(props: any) {
    super(props);
    if (!this.state) {
      this.state = {
        seedError: null,
        seeds: []
      };
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

  removeSeed(seedId: string) {
    //noinspection TypeScriptValidateTypes
    this.context.store.dispatch(removeSeed(seedId));
  }

  renderSeed(seed: any, index: number) {
    let style = seed.imageUrl ? {backgroundImage: 'url(' + seed.imageUrl + ')'} : {};

    return (
      <div className="seed"
           key={index}
           style={style}
      >
        <i className="remove"
           onClick={this.removeSeed.bind(this, seed.id)}
        >x</i>
        <div className="details">
          <div className="track">{seed.name}</div>
          <div className="artist">{seed.artist}</div>
        </div>
      </div>
    );
  }

  renderSeeds(seeds: any[]) {
    return (
      <div className="seedsHolder">
        <div className="wrap">
          {seeds.map((item, index) => this.renderSeed(item, index))}
        </div>
      </div>
    );
  }

  render() {
    let seeds: any[] = this.state.seeds;
    let empty = seeds.length <= 0;
    let content = !empty ? this.renderSeeds(seeds) : (
      <span className="emptySeeds">Get started by adding a seed track!</span>
    );

    return (
      <div className={empty ? 'seeds empty' : 'seeds'}>
        {content}
      </div>
    );
  }
};

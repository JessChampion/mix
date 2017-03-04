import * as React from 'react';

import {createMix} from '../actions/settings';
import {IStore, IStoreContext} from '../reducers';
import {ISettingsState} from '../reducers/reducers/settings';

// The mapping function tailors the store's state to the view's state.
function mapStateFromStore(store: IStore): ISettingsState {
  return {
    seedError: store.settings.seedError,
    seeds: store.settings.seeds
  };
}

export default class CreateButton extends React.Component<any, any> {
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

  createAMix() {
    //noinspection TypeScriptValidateTypes
    this.context.store.dispatch(createMix());
  }

  render() {
    return (
      <div className="createButtonHolder">
        <button className="createButton button"
                onClick={this.createAMix.bind(this)}
          >Create a <span className="mix">mix</span>
        </button>
      </div>
    );
  }
};

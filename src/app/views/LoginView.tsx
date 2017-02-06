﻿import * as React from 'react';
// import * as R from 'ramda';

import {loggedInWithSpotify, login} from '../actions/auth';
import {IStore, IStoreContext} from '../reducers';
export interface ILoginState {
  loaded?: boolean;
  token?: string;
}

// The mapping function tailors the store's state to the view's state.
function mapStateFromStore(store: IStore): ILoginState {
  return {
    loaded: true,
    token: store.auth.token
  };
}

export default class LoginView extends React.Component<any, ILoginState> {
  static contextTypes: React.ValidationMap<any> = {
    store: React.PropTypes.object
  };

  context: IStoreContext;
  unsubscribe: Function;

  constructor(props: any) {
    super(props);
    this.state = {loaded: false};
  }

  componentDidMount() {
    // This helper wraps common code so we can initialze state and then subscribe.
    this.setStateFromStore();
    this.unsubscribe = this.context.store.subscribe(this.setStateFromStore.bind(this));
  }

  checkForToken() {
    let {
      location,
      history
    } = this.props;
    let params = location.hash;
    if (params) {
      if (!this.state.token) {
        //noinspection TypeScriptValidateTypes
        this.context.store.dispatch(loggedInWithSpotify(params));
      } else {
        history.push('/');
      }
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  setStateFromStore() {
    this.setState(mapStateFromStore(this.context.store.getState()));
  }

  componentWillUpdate() {
    this.checkForToken();
  }

  loginWithSpotify() {
    //noinspection TypeScriptValidateTypes
    this.context.store.dispatch(login());
  }

  render() {
    return (
      <div className="loginView">
        <div className="login">
          <div className="content">
            <h1 className="title">MIX</h1>
            <button className="login-btn button" onClick={this.loginWithSpotify.bind(this)}>
              Login with Spotify
              <i className="fa fa-spotify" aria-hidden="true"/>
            </button>
          </div>
        </div>
        <div className="footer">
          by <a href="http://jesschampion.co.nz">Jess Champion</a>
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import {loggedInWithSpotify, loginWithSpotify} from '../actions/index';
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

    this.checkForToken();
  }

  checkForToken() {
    // http://localhost:3000/login#access_token=BQD9a0oBosPfJHdpyyuGfd4CI8NEgsiWMOBqN6MA4WaV-JiPriemXRhmle5E8gQrz-
    // HP45Cxejn0BTOe_CYpDVKfhnNV2-KuiyGRCc6EwI2va7DtnWZ2w3zu2PgTAqnL1MoUPUPa_yxDi--dYDvG
    // &token_type=Bearer&expires_in=3600&state=login
    let params = window.location.hash;
    console.log(params);
    //noinspection TypeScriptValidateTypes
    this.context.store.dispatch(loggedInWithSpotify(params));
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  setStateFromStore() {
    this.setState(mapStateFromStore(this.context.store.getState()));
  }

  loginWithSpotify() {
    //noinspection TypeScriptValidateTypes
    this.context.store.dispatch(loginWithSpotify());
  }

  render() {
    let loading = this.state.loaded ? '' : ' (loading...)';
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

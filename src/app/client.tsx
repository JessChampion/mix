import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {browserHistory, Router} from 'react-router';
import routes from './routes';
import store from './store';

export default ReactDOM.render((
    <Provider
      store={store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>
  ),
  document.getElementById('body')
);

import * as React from 'react';
import { browserHistory, IndexRoute, Route } from 'react-router';

import AppFrame from './views/AppFrame';
import LoginView from './views/LoginView';
import MainView from './views/MainView';
import NotFoundView from './views/NotFoundView';

const routeMap = (
    <Route path="/" component={AppFrame}>
        <IndexRoute component={MainView}/>
        <Route path="/login" component={LoginView}/>
        <Route path="/search" component={MainView}/>
        <Route path="*" component={NotFoundView} />
    </Route>
);

export default routeMap;

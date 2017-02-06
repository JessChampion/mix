import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

import AppFrame from './views/AppFrame';
import LoginView from './views/LoginView';
import NotFoundView from './views/NotFoundView';
import SearchView from './views/MainView';
import PlayView from './views/PlayView';

const routeMap = (
    <Route path="/" component={AppFrame}>
        <IndexRoute component={SearchView}/>
        <Route path="/login" component={LoginView}/>
        <Route path="/search" component={SearchView}/>
        <Route path="/play" component={PlayView}/>
        <Route path="*" component={NotFoundView} />
    </Route>
);

export default routeMap;

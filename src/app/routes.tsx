import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

import AboutView from './views/AboutView';
import AppFrame from './views/AppFrame';
import LoginView from './views/LoginView';
import NotFoundView from './views/NotFoundView';
import SearchView from './views/SearchView';

const routeMap = (
    <Route path="/" component={AppFrame}>
        <IndexRoute component={SearchView}/>
        <Route path="/login" component={LoginView}/>
        <Route path="/about" component={AboutView}/>
        <Route path="/search" component={SearchView}/>
        <Route path="*" component={NotFoundView} />
    </Route>
);

export default routeMap;

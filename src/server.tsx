/// <reference path="../typings/index.d.ts"/>

import express = require('express');
import * as history from 'history';
import http = require('http');
import path = require('path');
import React = require('react');
import * as ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';

import routes from './app/routes';
import store from './app/store';

let app = express();
let memoryHistory = history.createMemoryHistory();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

let min = '';

// development only
if ('development' === app.get('env')) {
  // app.use(express.errorHandler());
}

app.use(express.static(path.join(__dirname, '.')));

app.get('/help', (req, res) => {
  res.render('help', {title: 'Help', min});
});

app.use((req, res) => { // next) => {
  const location = memoryHistory.createLocation(req.url);

  match({routes, location}, (error, redirectLocation, renderProps: any) => {
    let html = ReactDOMServer.renderToString((
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    ));
    return res.render('main', {content: html, title: 'Home', min});
  });
});

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

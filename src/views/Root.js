import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes } from 'routes';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';
import HomePage from 'views/HomePage';
import io from "socket.io-client";

const socket = io.connect('/');

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.root} render={() => <Redirect to="/Home" />} />
          <Route exact path={routes.home} component={()=> <HomePage socket={socket}/>} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;

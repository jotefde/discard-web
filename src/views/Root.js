import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes } from 'routes';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';
import HomePage from 'views/HomePage';
import 'views/main.scss';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.root} render={() => <Redirect to="/Home" />} />
          <Route exact path={routes.home} component={()=> <HomePage/>} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;

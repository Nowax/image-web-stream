import React from 'react';
import {HashRouter as Router,
    Route,
 } from 'react-router-dom';

import NavigationBar from '../NavigationBar';
import DashboardPage from '../Dashboard';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import { withAuthentication } from '../Session';

import * as ROUTES from '../../constants/routes';


const App = () => (
    <Router>
      <div>
        <NavigationBar />

        <Route exact path={ROUTES.DASHBOARD} component={DashboardPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route exact path={ROUTES.LANDING} component={HomePage} />
      </div>
    </Router>
);

export default withAuthentication(App);
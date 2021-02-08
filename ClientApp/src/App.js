import React, { Component } from 'react';
import { Route } from 'react-router';
import Signup from './components/signup';
import Project from './components/project';
import Manageusers from './components/manageusers';
import Details from './components/details';
import Login from './components/login';
import Dashboard from './components/dashboard';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        <div>
              <Route path='/signup' component={Signup} />
              <Route path='/manageprojects' component={Project} />
              <Route path='/manageusers' component={Manageusers} />
              <Route path='/details' component={Details} />
              <Route path='/login' component={Login} />
              <Route path='/dashboard' component={Dashboard} />
        </div>
    );
  }
}

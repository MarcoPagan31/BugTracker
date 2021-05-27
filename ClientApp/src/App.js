import React, { Component } from 'react';
import { Route } from 'react-router';
import Signup from './components/signup';
import Project from './components/project';
import Manageusers from './components/manageusers';
import Assignusers from './components/assignusers';
import Details from './components/details';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Edit from "./components/edit";
import EditTicket from "./components/editticket";
import Roles from "./components/role";
import Demousers from "./components/demousers";
import Ticket from "./components/ticket";
import Profile from "./components/profile";
import EditProfile from "./components/editprofile";
import TicketDetails from "./components/ticketdetails";
import Userprojects from "./components/userprojects";
import Usertickets from "./components/usertickets";
import Confirmation from "./components/confirmation";
import ResetPassword from "./components/resetpassword";
import Notifications from "./components/notifications";
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        <div>
              <Route path='/signup' component={Signup} />
              <Route path='/manageprojects' component={Project} />
              <Route path='/userprojects' component={Userprojects} />
              <Route path='/manageusers' component={Manageusers} />
              <Route path='/assignusers' component={Assignusers} />
              <Route path='/manageroles' component={Roles} />
              <Route path='/details' component={Details} />
              <Route path='/login' component={Login} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/edit' component={Edit} />
              <Route path='/editticket' component={EditTicket} />
              <Route path='/demousers' component={Demousers} />
              <Route path='/managetickets' component={Ticket} />
              <Route path='/usertickets' component={Usertickets} />
              <Route path='/profile' component={Profile} />
              <Route path='/editprofile' component={EditProfile} />
              <Route path='/ticketdetails' component={TicketDetails} />
              <Route path='/confirmation' component={Confirmation} />
              <Route path='/notifications' component={Notifications} />
        </div>
    );
  }
}

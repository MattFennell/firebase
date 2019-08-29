import React from 'react';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import AuthenticatedRoute from './auth/AuthenticatedRoute';
import Test from './test';
import NavbarTwo from './navbar/Navbar';
import DashboardTwo from './dashboard/Dashboard';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div className="App">
      <Navbar />
      <NavbarTwo />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/dashboard" component={DashboardTwo} />
        <Route path="/project/:id" component={ProjectDetails} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/create" component={CreateProject} />
        <AuthenticatedRoute path="/protected" component={Test} />
      </Switch>
    </div>
  </ConnectedRouter>
);

export default App;

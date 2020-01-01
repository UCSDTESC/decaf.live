import React from 'react';
import {Switch, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from './pages/LoginPage';
import { withFirebase } from './data/firebase';

class Routes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  async componentWillMount() {
    await this.props.firebase.checkUserAuth(user => {
      if (user) {
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    })
  }

  render() {
    return (
      <Switch>
        <Route exact={true} path='/'>
          <HomePage />
        </Route> 
        <Route exact={true} path='/login'>
          <LoginPage />
        </Route>
        <ProtectedRoute exact={true} path='/admin' authenticated={this.state.loggedIn}>
          <AdminPage />
        </ProtectedRoute>
      </Switch>
    );
  }
}

export default withFirebase(Routes);
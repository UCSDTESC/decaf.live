import React from 'react';
import { withFirebase } from './data/firebase';
import { Route, Redirect } from 'react-router';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

class ProtectedRoute extends React.Component {

  render() {
    const {authenticated} = this.props;

    if (!authenticated) {
      this.props.history.push('/login')
    }

    return (
      <Route {...this.props}>
        {this.props.children}
      </Route>
    )
  }
}

export default compose(withFirebase, withRouter)(ProtectedRoute)
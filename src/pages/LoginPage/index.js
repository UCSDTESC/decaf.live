import React from 'react';
import {withFirebase} from '../../data/firebase';
import { compose } from 'recompose';
import { withRouter } from 'react-router';

class LoginPage extends React.Component {

  login = async () => {
    const res = await this.props.firebase.signInWithPopup();

    if (res.user) {
      const [username, domain] = res.user.email.split('@')

      if (domain.trim() !== 'tesc.ucsd.edu') {
        await this.logout();
      } else {
        this.props.history.push('/admin')
      }
    }
  }

  logout = async () => {
    const res = await this.props.firebase.logout();
  }

  render() {
    return (
      <>
      <button onClick={this.login}>
        login
      </button>
      <button onClick={this.logout}>
        logout
      </button>
      </>
    );
  }
}

export default compose(withRouter, withFirebase)(LoginPage)
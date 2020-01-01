import React from 'react';
import {withFirebase} from '../../data/firebase';
import { compose } from 'recompose';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import Stripes from '../../components/Stripes';
import Board from '../../components/Board';
import {ReactComponent as DecafLogo} from '../../svg/decaf.svg';

const Logo = styled(DecafLogo)`
    width: 40%;
`

const Button = styled.button`
  background: white;
  color: black;
  border: solid 2px black;
  border-radius: 15px;
  padding: 0.5rem;

`

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      err: ''
    }
  }

  login = async () => {
    const res = await this.props.firebase.signInWithPopup();

    if (res.user) {
      const [username, domain] = res.user.email.split('@')

      if (domain.trim() !== 'tesc.ucsd.edu') {
        await this.logout();
        this.setState({error: 'You tried logging in with a non tesc.ucsd.edu account.'})
      } else {
        this.props.history.push('/admin')
      }
    } else {
      this.setState({error: 'Something went wrong!'})
    }
  }

  logout = async () => {
    const res = await this.props.firebase.logout();
  }

  render() {
    const {error} = this.state;
    // const {authenticated} = this.props;

    // if (authenticated) {
    //   this.props.history.push('/admin');
    //   return null;
    // }

    return (
      <Stripes className="container-fluid d-flex">
        <div className="row w-100 align-self-center">
          <div className="col-md-8 offset-md-2">
          <Board>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="text-center"> 
                    <Logo />
                  </div>
                  <div className="text-center mt-4">
                    This feature is intended for admins only. Login with your @tesc.ucsd.edu account
                  </div>
                  <div className="mt-2 text-center">
                    <Button onClick={this.login}>
                      Login 
                    </Button>
                  </div>
                  <div className="text-danger my-2 text-center">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          </Board>
          </div>
        </div>
      </Stripes>
    );
  }
}

export default compose(withRouter, withFirebase)(LoginPage)
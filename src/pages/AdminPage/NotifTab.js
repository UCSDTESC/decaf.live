import React from 'react';
import Board from '../../components/Board';
import { withFirebase } from '../../data/firebase';

class NotifTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  sendEastNotifications = async () => {
    try {
      await this.props.firebase.sendNotifications(true);
    } catch (err) {
      this.setState({error: err.message})
    }
  }

  sendWestNotifications = async () => {
    try {
      await this.props.firebase.sendNotifications(false);
    } catch (err) {
      this.setState({error: err.message})
    }
  }

  render() {
    const {error} = this.state;
    return (
      <div className="mt-3 w-100">
        <Board>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  {error}
                </div>
                <div className="text-center mt-5 ">
                  <button type="submit" className="btn mt-1 btn-light"
                   onClick={this.sendEastNotifications}
                   >
                    Send East Ballroom Notifications
                  </button>
                </div>
                <div className="text-center mt-5 ">
                  <button type="submit" className="btn mt-1 btn-light"
                   onClick={this.sendWestNotifications}
                   >
                    Send West Ballroom Notifications
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Board>
      </div>
    );
  }
}

export default withFirebase(NotifTab);
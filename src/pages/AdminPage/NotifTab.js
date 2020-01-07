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
      await this.confirmNotifications(true);
    } catch (err) {
      this.setState({error: err.message})
    }
  }

  sendWestNotifications = async () => {
    try {
      await this.confirmNotifications(false);
    } catch (err) {
      this.setState({error: err.message})
    }
  }

  confirmNotifications = async (east) => {
    const res = await this.props.firebase.getWhoToSend(east);
    const [numsToSend, emailsToSend, message, currentTicketNum, docIds] = await
      this.props.firebase.getWhoToSend(east);

    const confirmed = window.confirm(
      `Notifying ${(east)? "EAST" : "WEST"} Ballroom up to ticket number ` +
      `${currentTicketNum}\n\n${numsToSend.length} users will be notified ` +
      `via sms and ${emailsToSend.length} ` +
      `users will be notified users via email. Confirm?`
    );

    if (confirmed) {
      await this.props.firebase.sendNotifications(
        east, numsToSend, emailsToSend, message, docIds
      );
    }
  }

  render() {
    const {error} = this.state;
    const {eastCurrTicketNum, westCurrTicketNum} = this.props;
    return (
      <div className="mt-3 w-100">
        <Board>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h3 className="text-center">
                  The Current East Ballroom Ticket Number is {' '}
                  <span className="text-success">
                    {eastCurrTicketNum ? eastCurrTicketNum : 'Loading....'}
                  </span>
                </h3>
                <h3 className="text-center">
                  The Current West Ballroom Ticket Number is {' '}
                  <span className="text-success">
                    {westCurrTicketNum ? westCurrTicketNum : 'Loading....'}
                  </span>
                </h3>
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
import React from 'react'
import TicketTab from './TicketTab';
import NotifTab from './NotifTab';
import Board from '../../components/Board';
import Stripes from '../../components/Stripes';
import styled from 'styled-components';
import { withFirebase } from '../../data/firebase';

const Tab = styled.button`
  background: white;
  color: white;
  border: 2px solid black;
  border-radius: 15px;
`
class AdminPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currTab: 0
    }

    this.tabs = [{
      component: TicketTab, 
      name: 'Update Current Ticket'
    }, {
      component: NotifTab, 
      name: 'Send Ticket Notifications'
    }]
  }

  renderTabPanel() {
    const tabs = this.tabs.map((t, i) => (
      <button className="btn btn-light mr-2" onClick={() => this.setState({currTab: i})}>
        {t.name}
      </button>
    ))

    tabs.push((
      <button className="btn btn-light ml-auto" onClick={() => this.logout()}>
        Logout
      </button>
    ))

    return tabs
  }

  logout = async () => {
    await this.props.firebase.logout();
  }

  renderCurrTab() {
    const {currTab} = this.state;
    const Component = this.tabs[currTab].component;
    return <Component />
  }

  render() {
    return (
      <Stripes className="container-fluid d-flex flex-column">
        <div className="w-50 d-flex align-self-center py-5">
          <Board> 
            <h1 className="text-center">
              Decaf.live Admin Dashboard
            </h1>
          </Board>
        </div>
        <div className="container pt-2">
          <div className="row"> 
            <div className="col-md-12">
              {this.renderTabPanel()}
            </div>
          </div>
          <div className="row">
          <div className="col-md-12">
              {this.renderCurrTab()}
            </div>        
          </div>
        </div>
      </Stripes>
    )
  }
}

export default withFirebase(AdminPage);
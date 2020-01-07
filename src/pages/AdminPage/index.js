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
      currTab: 0,
      eastCurrTicketNum: null,
      westCurrTicketNum: null,
    }

    this.tabs = [{
      component: TicketTab,
      name: 'Update Current Ticket'
    }, {
      component: NotifTab,
      name: 'Send Ticket Notifications'
    }]
  }

  async componentDidMount() {
    this.ticketRef = this.props.firebase.tickets();
    this.ticketRef.on('value', (data) => {
      const eastTicketNum = data.val().eastTicketNum;
    const westTicketNum = data.val().westTicketNum;
      this.setState({
        loading: false,
        eastCurrTicketNum: eastTicketNum,
    westCurrTicketNum: westTicketNum
      })
    }, (err) => console.error(err))
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
    const {currTab, eastCurrTicketNum, westCurrTicketNum} = this.state;
    const Component = this.tabs[currTab].component;
    return <Component eastCurrTicketNum={eastCurrTicketNum} westCurrTicketNum={westCurrTicketNum}/>
  }

  render() {
    return (
      <Stripes className="container-fluid d-flex flex-column">
        <div className="w-75 d-flex align-self-center py-5">
          <Board>
            <h1 className="text-center d-block">
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
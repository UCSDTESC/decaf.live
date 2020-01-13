import React from 'react';
import styled from 'styled-components';
import Board from '../../components/Board';
import { withFirebase } from '../../data/firebase';

const Num = styled.span`
  color: #39ff14
`

class TicketTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      eastInputTicketNum: '',
	    westInputTicketNum: '',
      error: ''
    }
  }

  onEastInput = (e) => {
    this.setState({eastInputTicketNum: e.target.value})
  }

  submitEastTicketUpdate = async () => {
    try {
      await this.props.firebase.updateEastTicketNum(this.state.eastInputTicketNum);
    } catch {
      this.setState({error: 'Something Went Wrong with updating the ticket number'})
    }
  }

   onWestInput = (e) => {
    this.setState({westInputTicketNum: e.target.value})
  }

  submitWestTicketUpdate = async () => {
    try {
      await this.props.firebase.updateWestTicketNum(this.state.westInputTicketNum);
    } catch {
      this.setState({error: 'Something Went Wrong with updating the ticket number'})
    }
  }

  render() {
    const { eastInputTicketNum, westInputTicketNum, error} = this.state;
    const {eastCurrTicketNum, westCurrTicketNum} = this.props;
    return (
      <div className="mt-3 w-100">
        <Board>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h3 className="text-center">
                  The Current East Ballroom Ticket Number is {' '}
                  <Num>
                    {eastCurrTicketNum ? eastCurrTicketNum : 'Loading....'}
                  </Num>
                </h3>
				        <h3 className="text-center">
                  The Current West Ballroom Ticket Number is {' '}
                  <Num>
                    {westCurrTicketNum ? westCurrTicketNum : 'Loading....'}
                  </Num>
                </h3>
                <div className="text-center">
                  {error}
                </div>
                <div className="text-center mt-5 ">
                  Update East Ballroom Ticket Number to:
                  <input type="number" onChange={this.onEastInput} className="form-control w-auto mx-auto mt-3" placeholder={eastCurrTicketNum}></input>
                  <button className="btn mt-1 btn-light"
                   onClick={this.submitEastTicketUpdate}
                   disabled={!eastInputTicketNum}
                   >
                    Update East Ballroom Ticket Number
                  </button>
                </div>
				<div className="text-center mt-5 ">
                  Update West Ballroom Ticket Number to:
                  <input type="number" onChange={this.onWestInput} className="form-control w-auto mx-auto mt-3" placeholder={westCurrTicketNum}></input>
                  <button className="btn mt-1 btn-light"
                   onClick={this.submitWestTicketUpdate}
                   disabled={!westInputTicketNum}
                   >
                    Update West Ballroom Ticket Number
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

export default withFirebase(TicketTab);
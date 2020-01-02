import React from 'react';
import Board from '../../components/Board';
import { withFirebase } from '../../data/firebase';

class TicketTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      eastCurrTicketNum: null,
	  westCurrTicketNum: null,
      eastInputTicketNum: '',
	  westInputTicketNum: '',
      error: ''
    }
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
    const {eastCurrTicketNum, eastInputTicketNum, westCurrTicketNum, westInputTicketNum, error} = this.state;
    return (
      <div className="mt-3 w-100">
        <Board>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h3 className="text-center">
                  The Current East Ballrom Ticket Number is {' '}
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
import React from 'react';
import Board from '../../components/Board';
import { withFirebase } from '../../data/firebase';

class TicketTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currTicketNum: null,
      inputTicketNum: '',
      error: ''
    }
  }

  async componentDidMount() {
    this.ticketRef = this.props.firebase.tickets();
    this.ticketRef.on('value', (data) => {
      const ticketNum = data.val().ticketNum;
      this.setState({
        loading: false,
        currTicketNum: ticketNum
      })
    }, (err) => console.error(err))
  }  

  onInput = (e) => {
    this.setState({inputTicketNum: e.target.value})
  }

  submitTicketUpdate = async () => {
    try {
      await this.props.firebase.updateTicketNum(this.state.inputTicketNum);
    } catch {
      this.setState({error: 'Something Went Wrong with updating the ticket number'})
    }
  }

  render() {
    const {currTicketNum, inputTicketNum, error} = this.state;
    return (
      <div className="mt-3 w-100">
        <Board>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h3 className="text-center">
                  The Current Ticket Number is {' '}
                  <span className="text-success">
                    {currTicketNum ? currTicketNum : 'Loading....'}
                  </span>
                </h3>
                <div className="text-center">
                  {error}
                </div>
                <div className="text-center mt-5 ">
                  Update Ticket Number to:
                  <input type="number" onChange={this.onInput} className="form-control w-auto mx-auto mt-3" placeholder={currTicketNum}></input>
                  <button className="btn mt-1 btn-light"
                   onClick={this.submitTicketUpdate}
                   disabled={!inputTicketNum}
                   >
                    Update Ticket Number
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
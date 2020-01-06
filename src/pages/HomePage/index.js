import React from 'react';
import styled from 'styled-components';
import Board from '../../components/Board';
import {ReactComponent as DecafLogo} from '../../svg/decaf.svg';
import {ReactComponent as Planter1} from '../../svg/decaf-planter1.svg';
import {ReactComponent as Planter2} from '../../svg/decaf-planter2.svg';
import {ReactComponent as Planter3} from '../../svg/decaf-planter3.svg';
import {withFirebase} from '../../data/firebase';
import Stripes from '../../components/Stripes';

const Logo = styled(DecafLogo)`
    width: 40%;
`

const Num = styled.span`
  color: #39ff14
`

const Counter = styled.div`
  font-size: 30px;
  font-weight: 800;
`

const Underline = styled.span`
  text-decoration: underline;
  //text-decoration-style: wavy;
`

const PopupBody = styled.div`
  color: black;
  margin: 2rem;
`

const Form = styled.form`
`

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      eastTicketNum: null,
	    westTicketNum: null
    }
  }

  async componentDidMount() {
    this.ticketRef = this.props.firebase.tickets();
    this.unsubscribe = this.ticketRef.on('value', (data) => {
      const eastTicketNum = data.val().eastTicketNum;
	  const westTicketNum = data.val().westTicketNum;
      this.setState({
        loading: false,
        eastTicketNum: eastTicketNum,
		westTicketNum: westTicketNum
		
      })
    }, (err) => console.error(err))
  }  

  submitNewUser = async (userInfo) => {
    try {
      await this.props.firebase.addUserNotifInfo(this.state.userInfo);
    } catch {
      this.setState({error: 'Something Went Wrong with updating the ticket number'})
    }
  }

  validateForm() {
    var name = document.forms["notif-form"]["name"].value;
    var email = document.forms["notif-form"]["email"].value;
    var phone = document.forms["notif-form"]["phone"].value;
    var ticket = document.forms["notif-form"]["ticket"].value;
    console.log(name + " " + email + " " + phone + " " + ticket);

    var userInfo = {
      fullName: name,
      email: email,
      phone: phone,
      ticket: ticket
    }

    //submitNewUser(userInfo);
  }
  
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {loading, eastTicketNum, westTicketNum} = this.state;

    return (
      <Stripes className="container-fluid d-flex flex-column">
        <div className="row w-100 mx-auto mb-auto mt-5">
          <div className="col-md-10 offset-md-1">
            <Board>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="text-center"> 
                      <Logo />
                    </div>
                    <Counter className="text-center mt-2">
                      Current <Underline>East Ballroom</Underline> Ticket Number: {' '}
                      {loading ? (
                        <div class="spinner-border ml-2" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>)
                      : <Num>{eastTicketNum}</Num>}
                    </Counter>
                    <Counter className="text-center mt-2">
                      Current <Underline>West Ballroom</Underline> Ticket Number: {' '}
                      {loading ? (
                        <div class="spinner-border ml-2" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>)
                      : <Num>{westTicketNum}</Num>}
                    </Counter>
                    <div className="my-3 ml-5">
                      <ul>
                        <li>Please wait in line</li>
                        <li>Thank You!</li>
                      </ul>
                    </div>
                    <div className="my-3 ml-5">

<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Sign up for notifications
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      {/* <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> */}
      <PopupBody class="modal-body">
        <Form name="notif-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" aria-describedby="name" placeholder="First Name and Last Name" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" class="form-control" id="email" placeholder="Email" />
          </div>
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="phone" class="form-control" id="phone" placeholder="5555555555" />
          </div>
          <div class="form-group">
            <label for="ticket">Ticket Number</label>
            <input type="text" class="form-control" id="ticket" placeholder="12" />
          </div>
        </Form>
      </PopupBody>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" onClick={this.validateForm}>Submit</button>
      </div>
    </div>
  </div>
</div>




                    </div>
                  </div>
                </div>
              </div>
            </Board>
          </div>
        </div>
        <div className="d-flex align-items-center w-100 mt-auto mx-auto">
          <Planter1 className="w-10 mt-auto mx-auto"/> 
          <Planter2 className="w-10 mt-auto mx-auto"/> 
          <Planter3 className="w-10 mt-auto mx-auto"/> 
        </div>
      </Stripes>
    );
  }
}

export default withFirebase(HomePage);
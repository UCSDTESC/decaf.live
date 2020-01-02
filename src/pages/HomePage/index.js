import React from 'react';
import styled from 'styled-components';
import Board from '../../components/Board';
import {ReactComponent as DecafLogo} from '../../svg/decaf.svg';
import {withFirebase} from '../../data/firebase';
import Stripes from '../../components/Stripes';

const Logo = styled(DecafLogo)`
    width: 40%;
`

const Counter = styled.div`
  font-size: 30px;
  font-weight: 800;
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
    this.ticketRef.on('value', (data) => {
      const eastTicketNum = data.val().eastTicketNum;
	  const westTicketNum = data.val().westTicketNum;
      this.setState({
        loading: false,
        eastTicketNum: eastTicketNum,
		westTicketNum: westTicketNum
		
      })
    }, (err) => console.error(err))
  }  
  
  render() {
    const {loading, eastTicketNum, westTicketNum} = this.state;

    return (
      <Stripes className="container-fluid d-flex">
        <div className="row w-100 align-self-center">
          <div className="col-md-10 offset-md-1">
            <Board>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="text-center"> 
                      <Logo />
                    </div>
                    <div className="my-3">
                      some kind of faq / user education thing here
                    </div>
                    <Counter className="text-center mt-2">
                      Current East Ballroom Ticket Number: {loading ? 'Loading..' : eastTicketNum}
                    </Counter>
                    <Counter className="text-center mt-2">
                      Current West Ballroom Ticket Number: {loading ? 'Loading..' : westTicketNum}
                    </Counter>
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

export default withFirebase(HomePage);
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
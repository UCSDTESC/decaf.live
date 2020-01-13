import React from 'react';
import styled from 'styled-components';
import Board from '../../components/Board';
import {ReactComponent as DecafLogo} from '../../svg/decaf.svg';
import {ReactComponent as Planter1} from '../../svg/decaf-planter1.svg';
import {ReactComponent as Planter2} from '../../svg/decaf-planter2.svg';
import {ReactComponent as Planter3} from '../../svg/decaf-planter3.svg';
import {withFirebase} from '../../data/firebase';
import BallroomModal from './BallroomModal';
import Stripes from '../../components/Stripes';
import Footer from '../../components/Footer';
import Question from '../../components/Question';
import UserDataForm from './UserDataForm';
import { ReactTypeformEmbed } from 'react-typeform-embed';

import faqData from '../../data/Faq';

const Logo = styled(DecafLogo)`
    width: 40%;
	min-width: 150px;
	max-width: 350px;
`

const Num = styled.span`
  color: #39ff14
`

const Counter = styled.div`
  font-size: 28px;
  font-weight: 800;
`

const Underline = styled.span`
  text-decoration: underline;
  color: lightblue;

  &:hover {
    cursor: pointer;
    color: white;
  }
  //text-decoration-style: wavy;
`

const PopupBody = styled.div`
  color: black;
  margin: 2rem;
`

const Form = styled.form`
`
// lol no enums in js..
const ModalStates = {
  None: 0,
  West: 1,
  East: 2
}

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      eastTicketNum: null,
      westTicketNum: null,
      currentModal: ModalStates.None
    }
  }

  async componentDidMount() {
    this.ticketRef = this.props.firebase.tickets();

    this.unsubscribe = this.ticketRef.on('value', (data) => {
      const {eastTicketNum, westTicketNum} = data.val();
      const {eastTicketNum: oldEastTicketNum, westTicketNum: oldWestTicketNum } = this.state;
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

  renderModal = () => {
    const {currentModal} = this.state;

    const modalProps = {
      open: true,
      toggle: () => this.setState({currentModal: ModalStates.None})
    }

    const westProps = {
      ...modalProps,
      title: 'West Ballroom'
    }

    const eastProps = {
      ...modalProps,
      title: 'East Ballroom'
    }

    switch (currentModal) {
      case ModalStates.West:
        return <BallroomModal
          {...westProps}
        />
      case ModalStates.East:
        return <BallroomModal {...eastProps}/>
      case ModalStates.None:
      default:
        return null;
    }
  }

  render() {
    const {loading, eastTicketNum, westTicketNum} = this.state;

    return (
	  <>
      <Stripes className="container-fluid d-flex flex-column">
        {this.renderModal()}
        <div className="row w-100 mx-auto mb-auto mt-3">
          <div className="col-md-10 offset-md-1">
            <Board>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="text-center">
                      <Logo />
                    </div>
                    <Counter className="text-center mt-2">
                      Current <a href="#east_maps">East Ballroom</a> Ticket Number: {' '}
                      {loading ? (
                        <div class="spinner-border ml-2" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>)
                      : <Num>{eastTicketNum}</Num>}
                    </Counter>
                    <Counter className="text-center mt-2">
                      Current <a href="#west_maps">West Ballroom</a> Ticket Number: {' '}
                      {loading ? (
                        <div class="spinner-border ml-2" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>)
                      : <Num>{westTicketNum}</Num>}
                    </Counter>
                    
					<b>Important Reminders:</b><br/>
					<ul>
					<li>After your ticket number is called, remember to bring your <u>ticket, UCSD ID, and wristband</u> back to the ballrooms.</li>
					<li>Remember to <a href="#subscribe">subscribe</a> to ticket number notifications, <a href="#upload">upload your resume</a>, and sign up for <a target="_blank" href="https://ripplematch.com/index?r=7qszUz">RippleMatch</a></li>
					<li>Have questions? Check out the <a href="#faq">FAQ section</a> below</li>
					</ul>
					
                      
                    </div>
                  </div>
                </div>
            </Board>
			
          </div>
        </div>
		<div className="container-fluid">
			  <div className="row">
				<div className="col-md-4 mt-3 offset-md-1">
					<Board>
            <div id="subscribe" className="text-center">
              <Counter>Subscribe to Ticket Number Notifications</Counter>
            </div>
            <div className="container-fluid">
              <UserDataForm />
            </div>
					</Board>
				</div>
				<div className="col-md-6 mt-3">
					<Board>
					  <div id="upload" className="container-fluid">
						  <div  className="text-center">
							  <Counter>Upload Your Resume</Counter>
						  </div>
						  <div className="mt-3">
							  <ReactTypeformEmbed style={{width:"100%", height:"525px", marginLeft:"auto",marginRight:"auto", position:"static"}} url="https://tesc.typeform.com/to/hwNBpM"/>
						  </div>
						</div>
					</Board>
				</div>  
          </div>
		</div>
		<div className="container-fluid mt-3 col-md-10 offset-md-1">
				<Board>
					<div id="faq" className="container-fluid text-center" style={{paddingLeft:"0px",paddingRight:"0px"}}>
						<Counter>FAQ</Counter>
						<div className="col-sm-12 col-md-10 offset-md-1 mt-1 mb-1">
								{faqData.map((d, i) => <Question 
                  {...d} 
                  key={i} 
                  idx={i}
                  isLast={i === faqData.length - 1}
                  isFirst = {i === 0}
									/>)}
						</div>
					</div>
					
				</Board>
			
		</div>
		<div className="container-fluid">
			  <div className="row">
				<div className="col-md-5 mt-3 offset-md-1">
					<Board>
						  <div id="east_maps" className="text-center">
							<Counter className="mb-1">East Ballroom Company Map</Counter>
								<div className="container-fluid">
								<a href="/east.svg" ><img src="/east.svg" className="mb-3 mt-1" width="100%"/></a>
								<a href="/east.pdf"><button className="btn btn-light">East Ballroom Map (PDF)</button></a>
								</div>
						  </div>


					</Board>
				</div>
				<div className="col-md-5 mt-3">
					<Board>

						  <div id="west_maps" className="text-center">
							<Counter className="mb-1">West Ballroom Company Map</Counter>
								<div className="container-fluid">
								<a href="/west.svg" ><img src="/west.svg" className="mb-3 mt-1" width="100%"/></a>
								<a href="/west.pdf"><button className="btn btn-light">West Ballroom Map (PDF)</button></a>
								</div>
						  </div>
					</Board>
				</div>
				
            
          </div>
		</div>
        <div className="d-flex align-items-center w-100 mt-auto mx-auto">
          <Planter1 className="w-10 mt-auto mx-auto"/>
          <Planter2 className="w-10 mt-auto mx-auto"/>
          <Planter3 className="w-10 mt-auto mx-auto"/>
        </div>
		<div style={{marginBottom:"15px", marginTop: "-4px", zIndex:"1"}}>
      <Board>
        <Footer/>
      </Board>
		</div>
    </Stripes>
	  </>
    );
  }
}

export default withFirebase(HomePage);
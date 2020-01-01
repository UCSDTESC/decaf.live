import React from 'react';
import styled from 'styled-components';
import Board from '../../components/Board';
import {ReactComponent as DecafLogo} from '../../svg/decaf.svg';

const Stripes = styled.div`
  height: 90%;
  background: repeating-linear-gradient(
    90deg,
    #d49454,
    #d49454 10px,
    #f3c585 10px,
    #f3c585 50px
  );
`

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
      ticketNum: null
    }
  }

  async componentDidMount() {
    const res = await fetch('/api/tickets')
    const data = await res.json();

    this.setState({
      loading: false,
      ticketNum: data.ticketNum
    })
  }  
  
  render() {
    const {loading, ticketNum} = this.state;

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
                      Current Ticket Number: {loading ? 'Loading..' : ticketNum}
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

export default HomePage;
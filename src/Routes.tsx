import React, {Component} from 'react';
import {RouteComponentProps} from 'react-router';
import {Switch, Route} from 'react-router-dom';
import DecafNav from './components/Navbar';
import HomePage from './pages/HomePage';

class Routes extends Component<{}, {}> {

  private withLayout = (RenderComponent: any) => {
    return (props: RouteComponentProps) => (
      <>
        <DecafNav />
        <RenderComponent match={props.match}/>
        <div>footer</div>
      </>
    );
  }

  public render () {
    return (    
      <Switch>
        <Route 
          exact={true}
          path="/"
          component={this.withLayout(HomePage)}
        />
      </Switch>
    );
  }
}

export default Routes;

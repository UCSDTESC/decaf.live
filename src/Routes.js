import React from 'react';
import {Switch, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import Firebase, {FirebaseContext} from './data/firebase';

function Routes() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Switch>
        <Route exact={true} path='/'>
          <FirebaseContext.Consumer>
            {firebase => <HomePage firebase={firebase} />}
          </FirebaseContext.Consumer>
        </Route> 
      </Switch>
    </FirebaseContext.Provider>
  );
}

export default Routes;
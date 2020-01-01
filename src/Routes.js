import React from 'react';
import {Switch, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';

function Routes() {
  return (
    <Switch>
      <Route exact={true} path='/'>
        <HomePage />
      </Route> 
    </Switch>
  );
}

export default Routes;
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import Firebase, {FirebaseContext} from './data/firebase';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <FirebaseContext.Provider value={new Firebase()}>
      <Routes />
    </FirebaseContext.Provider>
  </BrowserRouter>, 
  document.getElementById('root'));
  
serviceWorker.unregister();

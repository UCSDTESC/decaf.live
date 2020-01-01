import React from 'react';
import FirebaseContext from './context';
import Firebase from './firebase';

const withFirebase = Component => props  => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase}/>}
  </FirebaseContext.Consumer>
);

export default Firebase;
export { FirebaseContext, withFirebase };
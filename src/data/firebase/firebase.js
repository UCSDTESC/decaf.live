import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "decaf-live.firebaseapp.com",
  databaseURL: "https://decaf-live.firebaseio.com",
  projectId: "decaf-live",
  storageBucket: "decaf-live.appspot.com",
  messagingSenderId: "55409926490",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-9R4XZPLB67"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    
    this.auth = app.auth();
    this.provider = new app.auth.GoogleAuthProvider();
    this.db = app.database();
  }

  tickets = () => this.db.ref('ticket')

  signInWithPopup = () => this.auth.signInWithPopup(this.provider)

  checkUserAuth = (user) => this.auth.onAuthStateChanged(user)

  logout = () => this.auth.signOut();
}

export default Firebase;
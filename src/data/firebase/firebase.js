import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

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
    this.firestore = app.firestore();
  }

  tickets = () => this.db.ref('ticket')

  signInWithPopup = () => this.auth.signInWithPopup(this.provider)

  checkUserAuth = (user) => this.auth.onAuthStateChanged(user)

  logout = () => this.auth.signOut();

  updateEastTicketNum = (newNum) => this.db.ref('ticket').update({eastTicketNum: newNum})

  updateWestTicketNum = (newNum) => this.db.ref('ticket').update({westTicketNum: newNum})

  sendNotifications = (east) => {
    this.tickets().on('value', async (data) => {
      let currentTicketNum = (east)? data.val().eastTicketNum : data.val().westTicketNum;
      let notifiedWhich = (east)? 'notifiedEast' : 'notifiedWest';
      let numsToSend = [];
      let emailsToSend = [];

      // query for all users not notified for particular ballroom
      // and having <= current ticket number
      const snapshot = await this.firestore.collection("userData")
        .where(notifiedWhich, '==', false)
        .where('ticketNum', '<=', Number(currentTicketNum))
        .get();

      for (const doc of snapshot.docs) {
        const docData = doc.data();

        if ('phone' in docData) {
          numsToSend.push(docData.phone);
        }

        if ('email' in docData) {
          emailsToSend.push(docData.email);
        }

        doc.ref.update({[notifiedWhich]: true});
      }

      // set up number bindings for twilio
      let numBindings = numsToSend.map(number => {
        let usNumber = "+1" + number;
        return JSON.stringify({binding_type: 'sms', address: usNumber});
      });
      let message = `Hello from Decaf. The current ticket number for PC ${(east)? "East" : "West"} Ballroom is ${currentTicketNum}.`
      let smsBody = {
        'bindings': numBindings,
        'message': message
      };

      if (numsToSend.length > 0) {
        fetch('/api/sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(smsBody)
        })
        .then((res) => console.log(res))
        .catch(err => {
          console.log(err);
        });
      }

      // set up email bindings for sendgrid
      let emailBody = {
        'emails': emailsToSend,
        'message': message
      }

      fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailBody)
      })
      .then((res) => console.log(res))
      .catch(err => {
        console.log(err);
      });
    }, (errTickets) => console.error(errTickets))
  }
}

export default Firebase;
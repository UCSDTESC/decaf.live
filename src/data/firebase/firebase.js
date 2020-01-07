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

  addUserNotifInfo = (userInfo) => this.firestore.collection("userData").add({
    fullName: userInfo.fullName,
    email: userInfo.email,
    phone: userInfo.phone,
    ticketNum: userInfo.ticketNum
  })

  getWhoToSend = async (east) => {
    const data = await this.tickets().once('value');
    let currentTicketNum = (east)? data.val().eastTicketNum : data.val().westTicketNum;
    let notifiedWhich = (east)? 'notifiedEast' : 'notifiedWest';
    let numsToSend = [];
    let emailsToSend = [];
    let docIds = [];

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

      docIds.push(doc.id);
    }

    const message = `The current ${(east)? "East" : "West"} Ballroom ` +
                    `ticket number is ${currentTicketNum}. Your ticket ` +
                    `is eligible to enter ${(east)? "East" : "West"} ` +
                    `Ballroom. Visit https://decaf.live for more info. `+
                    `See you soon!`;

    return [numsToSend, emailsToSend, message, currentTicketNum, docIds];
  }

  sendNotifications = (east, numsToSend, emailsToSend, message, docIds) => {
    // set up number bindings for twilio
    let numBindings = numsToSend.map(number => {
      let usNumber = "+1" + number;
      return JSON.stringify({binding_type: 'sms', address: usNumber});
    });
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

    if (emailsToSend.length > 0) {
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
    }

    // batch write to firebase
    const notifiedWhich = (east)? 'notifiedEast' : 'notifiedWest';
    let batch = this.firestore.batch();
    for (const id of docIds) {
      let curRef = this.firestore.collection('userData').doc(id);
      batch.update(curRef, {[notifiedWhich]: true});
    }

    return batch.commit();
  }
}

export default Firebase;
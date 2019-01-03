import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import dayjs from 'dayjs'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  };

const owner = 'bogdan'
const todayUTC = () => dayjs().format('YYYY-MM-DD');
const latestCollectionName = () => `${owner}-${todayUTC()}`

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.firestore = app.firestore();
    const settings = {timestampsInSnapshots: true};
    this.firestore.settings(settings);
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Firestore API ***

  getLatestImage = () => {
    return this.firestore.collection(latestCollectionName())
      .orderBy('fileName', 'desc')
      .limit(1)
      .get()
      .then( prevSnapshot => {
          if (prevSnapshot.docs !== 0) {
            return prevSnapshot.docs[0].data()
          }
      }).catch( e => console.log(e))
  }
}

export default Firebase;
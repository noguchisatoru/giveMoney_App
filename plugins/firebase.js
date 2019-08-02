import firebase from 'firebase'

var firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DATABASE_URL,
    projectId: process.env.FB_PROJECTID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID
  };

// Initialize Firebase
if(!firebase.apps.length){
 firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth}
 
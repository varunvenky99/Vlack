import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCiC9E_df0Ej7HeMdZf3avu3GNlqUUCMeE",
  authDomain: "slack-clone-vlack.firebaseapp.com",
  projectId: "slack-clone-vlack",
  storageBucket: "slack-clone-vlack.appspot.com",
  messagingSenderId: "207621782271",
  appId: "1:207621782271:web:2f8bb47bb1bbf227062aca",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };

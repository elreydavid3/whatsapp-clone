import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDcrJpYbh2BpAHAXWvN3Kc2a6Q_oK0HVQI",
  authDomain: "whatsapp-clone-6f0a4.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-6f0a4.firebaseio.com",
  projectId: "whatsapp-clone-6f0a4",
  storageBucket: "whatsapp-clone-6f0a4.appspot.com",
  messagingSenderId: "184212487230",
  appId: "1:184212487230:web:0f2d41aae541a7f14de56f",
  measurementId: "G-S619WX3JZZ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

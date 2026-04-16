const firebaseConfig = {
  apiKey: "AIzaSyAui3G4Zirr1KhT-o0gdCaquzUZw2ujVxc",
  authDomain: "foodwastesystem-e2516.firebaseapp.com",
  projectId: "foodwastesystem-e2516",
  storageBucket: "foodwastesystem-e2516.appspot.com",
  messagingSenderId: "232561224230",
  appId: "1:232561224230:web:5e0ed6c1f804565c7a14e7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
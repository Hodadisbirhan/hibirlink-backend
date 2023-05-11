const firebase = require("firebase-admin");

let firebaseConfig = {
  apiKey: process.env.NUXT_FIREBASE_API_KEY,
  authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NUXT_STORAGE_PACKET,
  messagingSenderId: process.env.NUXT_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NUXT_FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);

module.exports = firebase;

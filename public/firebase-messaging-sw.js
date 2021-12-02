// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyBCmQ2vVH907_KRpbPucGpMRyxO6QGT_n0",
    authDomain: "pushy-push-jr.firebaseapp.com",
    projectId: "pushy-push-jr",
    storageBucket: "pushy-push-jr.appspot.com",
    messagingSenderId: "410427911174",
    appId: "1:410427911174:web:cd2cc0ede48e1122d42787"
};

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();



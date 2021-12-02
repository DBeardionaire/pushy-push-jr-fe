// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCmQ2vVH907_KRpbPucGpMRyxO6QGT_n0",
    authDomain: "pushy-push-jr.firebaseapp.com",
    projectId: "pushy-push-jr",
    storageBucket: "pushy-push-jr.appspot.com",
    messagingSenderId: "410427911174",
    appId: "1:410427911174:web:cd2cc0ede48e1122d42787"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

import { getMessaging, getToken, onMessage } from "firebase/messaging"
import { onNotification } from "./utils";

const vapidKey = 'BCsZnimInHy7rKzFbhlaSB0KhBnFApYpnLmQiWd_zAE_dRRmttM3z4daGur3IptQRtw6QI7I_77i1r7oV3AOC-E'

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging(firebaseApp)

export const getFirebaseToken = async () => {
    try {
        const currentToken = await getToken(messaging, { vapidKey })

        if (currentToken) {
            // TODO: send to server to store this user's token
            // Send the token to your server and update the UI if necessary
            return currentToken
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    } catch (err) {
        console.log('An error occurred while retrieving token. ', err)
    }
}

onMessage(messaging, (payload) => {
    console.log('On Message received. ', payload);
    // pop notification
    onNotification(payload.notification?.title ?? 'Title', payload.notification?.body)
})
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBQH5ECmvlH585yETvvUQyvxVLdjN2SKsg",
  authDomain: "neuroapp-da330.firebaseapp.com",
  projectId: "neuroapp-da330",
  storageBucket: "neuroapp-da330.firebasestorage.app",
  messagingSenderId: "43238959599",
  appId: "1:43238959599:web:8e81ae0e8b52e06870ae1a",
  measurementId: "G-SFB5CW53DY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Function to request permission for notifications
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "BK7Cw2c9g4XhStN3jDMtgKW1nEA1oWf08GdygVcPSnBpDH3fnvzma5vCr8PuLrkecxma6utbBSitpHbOYDD11kg", // From Firebase Console
    });

    if (currentToken) {
      console.log("FCM Token:", currentToken);
    } else {
      console.log("No registration token available.");
    }
  } catch (err) {
    console.log("Error getting FCM token:", err);
  }
};

// Listen for incoming messages
onMessage(messaging, (payload) => {
  console.log("Message received: ", payload);
});

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAtzkGC1vT9Pwuk0xbLwX4HHYbzc4tAbyA",
    authDomain: "neuro-app-utf.firebaseapp.com",
    projectId: "neuro-app-utf",
    storageBucket: "neuro-app-utf.firebasestorage.app",
    messagingSenderId: "512479156684",
    appId: "1:512479156684:web:3cdf4bc3873e6cdb41e569",
    measurementId: "G-PNMZL1DGS6"
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

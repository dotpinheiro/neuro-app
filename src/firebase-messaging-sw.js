importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

// Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Background Message received:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  });
});

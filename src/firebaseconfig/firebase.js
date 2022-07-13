// Import the functions from the SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbembTsi8cgMhgEGqQHztwtaqDZYSPmpM",
  authDomain: "inv-imse.firebaseapp.com",
  projectId: "inv-imse",
  storageBucket: "inv-imse.appspot.com",
  messagingSenderId: "35864595165",
  appId: "1:35864595165:web:44929153e590d94c336934"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export collection in a local memory
export const db = getFirestore(app);
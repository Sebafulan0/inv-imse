// Import the functions from the SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "inv-imse.firebaseapp.com",
  projectId: "inv-imse",
  storageBucket: "inv-imse.appspot.com",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export collection in a local memory
export const db = getFirestore(app);

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBVcpSe8ZTRIiziPCRo0y0xKfH7l1ANJLo',
  authDomain: 'ninja-firegram-1509.firebaseapp.com',
  projectId: 'ninja-firegram-1509',
  storageBucket: 'ninja-firegram-1509.appspot.com',
  messagingSenderId: '1018443771789',
  appId: '1:1018443771789:web:9d361c2548c54475c4d7c4',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();

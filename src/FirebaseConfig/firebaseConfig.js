import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDK47ibMPHZfqMn1JLZlS2JfjyZdTVbd1c",
    authDomain: "ecommerce-373fb.firebaseapp.com",
    databaseURL: "https://ecommerce-373fb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ecommerce-373fb",
    storageBucket: "ecommerce-373fb.appspot.com",
    messagingSenderId: "943608439632",
    appId: "1:943608439632:web:9b323bcb54d6802f764255"
};

/* const firebaseConfig = {
    apiKey: "AIzaSyBMQWAM0hNKltexfBddh2jEEX5YYKX8kKk",
    authDomain: "ecommerce-65e6f.firebaseapp.com",
    databaseURL: "https://ecommerce-65e6f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ecommerce-65e6f",
    storageBucket: "ecommerce-65e6f.appspot.com",
    messagingSenderId: "465572624065",
    appId: "1:465572624065:web:93a3c66d0de63eff51c640",
    measurementId: "G-4THK3X2Z2S"
}; */

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBK2JgrvpM59K59oo13kscwCTLNX0aG1zI",
  authDomain: "agile-board-agb.firebaseapp.com",
  projectId: "agile-board-agb",
  storageBucket: "agile-board-agb.appspot.com",
  messagingSenderId: "206915705433",
  databaseURL:
    "https://agile-board-agb-default-rtdb.europe-west1.firebasedatabase.app",
  appId: "1:206915705433:web:d2c27450a2d291df832f48",
  measurementId: "G-8LQH4V08HX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);

// project-206915705433

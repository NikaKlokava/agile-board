import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBK2JgrvpM59K59oo13kscwCTLNX0aG1zI",
  authDomain: "agile-board-agb.firebaseapp.com",
  projectId: "agile-board-agb",
  storageBucket: "agile-board-agb.appspot.com",
  messagingSenderId: "206915705433",
  appId: "1:206915705433:web:d2c27450a2d291df832f48",
  measurementId: "G-8LQH4V08HX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// project-206915705433

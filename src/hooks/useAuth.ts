import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDqhIfH91fNrec7j0Mx-P92zhwa8qFmmek",
  authDomain: "cryptotrader-bef0c.firebaseapp.com",
  projectId: "cryptotrader-bef0c",
  storageBucket: "cryptotrader-bef0c.appspot.com",
  messagingSenderId: "661519266689",
  appId: "1:661519266689:web:bde6b01e5e699a9e1c2e80",
  measurementId: "G-XCT4YX48D0",
};

// Inicializando Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

const auth = getAuth();

export function useAuth() {
  const [user, setUser] = React.useState<User>();

  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return authState;
  }, []);

  return {
    user,
  };
}

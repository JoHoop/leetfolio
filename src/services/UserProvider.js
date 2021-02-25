import React, { useEffect, useState, createContext } from 'react';
import firebase from './Firebase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

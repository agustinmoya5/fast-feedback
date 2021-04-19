// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import cookie from "js-cookie";

import { createUser } from "./db";
import firebase from "./firebase";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);

      cookie.set("fast-feedback-auth", true, {
        expires: 1,
      });

      setUser(user);
      return user;
    } else {
      setUser(false);
      cookie.remove("fast-feedback-auth");

      return false;
    }
  };

  const signinWithGithub = () => {
    Router.push("/dashboard");
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signinWithGoogle = () => {
    Router.push("/dashboard");
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signout = () => {
    Router.push("/");

    return firebase
      .auth()
      .signOut()
      .then((response) => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signinWithGoogle,
    signout,
  };
}

const formatUser = (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  token: user.za,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoURL,
});

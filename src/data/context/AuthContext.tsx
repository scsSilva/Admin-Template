import React, { createContext, useEffect, useState } from "react";
import route from "next/router";
import Cookies from "js-cookie";
import User from "../../model/User";
import firebase from "../../firebase/config";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

interface AuthContextProps {
  user?: User | null;
  loading?: boolean;
  loginGoogle?: () => Promise<void>;
  loginEmailAndPassword?: (email: string, password: string) => Promise<void>;
  signUpEmailAndPassword?: (email: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
}

async function normalizedUser(userFirebase: firebase.User): Promise<User> {
  const token = await userFirebase.getIdToken();

  return {
    uid: userFirebase.uid,
    name: userFirebase.displayName as string,
    email: userFirebase.email as string,
    token,
    provider: userFirebase.providerData[0]?.providerId as string,
    imageUrl: userFirebase.photoURL as string,
  };
}

function cookie(logged: boolean) {
  if (logged)
    Cookies.set("admin-template-auth", logged.toString(), { expires: 3 });
  else Cookies.remove("admin-template-auth");
}

export const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider: React.FunctionComponent<
  AuthContextProviderProps
> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const configSection = async (userFirebase: firebase.User | null) => {
    if (userFirebase?.email) {
      const user = await normalizedUser(userFirebase);

      setUser(user);
      cookie(true);
      setLoading(false);

      return user.email;
    } else {
      setUser(null);
      cookie(false);
      setLoading(false);
    }
  };

  const loginGoogle = async () => {
    try {
      setLoading(true);

      const res = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      configSection(res.user as firebase.User);
      route.push("/");
    } finally {
      setLoading(false);
    }
  };

  const loginEmailAndPassword = async (email: string, password: string) => {
    try {
      setLoading(true);

      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      await configSection(res.user as firebase.User);
      route.push("/");
    } finally {
      setLoading(false);
    }
  };

  const signUpEmailAndPassword = async (email: string, password: string) => {
    try {
      setLoading(true);

      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await configSection(res.user as firebase.User);
      route.push("/");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await configSection(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Cookies.get("admin-template-auth")) {
      const quit = firebase.auth().onIdTokenChanged(configSection as any);
      return () => quit();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginGoogle,
        loginEmailAndPassword,
        signUpEmailAndPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import { getCurrentUser } from "@/api/AuthApi";
import React, { useContext, useEffect, useState } from "react";
import { AuthStatus, IAuth, Props } from "@/types";

const defaultState: IAuth = {
  authStatus: AuthStatus.SignedOut,
};

export const AuthContext = React.createContext(defaultState);

export const AuthIsSignedIn = ({ children }: Props) => {
  const { authStatus }: IAuth = useContext(AuthContext);

  return <>{authStatus === AuthStatus.SignedIn ? children : null}</>;
};

export const AuthIsNotSignedIn = ({ children }: Props) => {
  const { authStatus }: IAuth = useContext(AuthContext);

  return <>{authStatus === AuthStatus.SignedOut ? children : null}</>;
};

const AuthProvider = ({ children }: Props) => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.SignedOut);

  useEffect(() => {
    async function getWhoAmI() {
      const res = await getCurrentUser();
      if (res) {
        setAuthStatus(AuthStatus.SignedIn);
      } else {
        setAuthStatus(AuthStatus.SignedOut);
      }
    }
    getWhoAmI().then();
  }, [setAuthStatus, authStatus]);

  function signIn() {
    setAuthStatus(AuthStatus.SignedIn);
  }

  function signOut() {
    setAuthStatus(AuthStatus.SignedOut);
  }

  const state: IAuth = {
    authStatus,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

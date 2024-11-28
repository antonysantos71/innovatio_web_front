import React, { createContext, useEffect, useState } from "react";
import { IContext, IUser } from "./types";
import { getUserLocalStorage, loginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStorage();

    if(user) {
      setUser(user);
    }
  }, []);

  const authenticate = async (email: string, password: string) => {
    try {
      const response = await loginRequest(email, password);
      if (response.token) {
        const payLoad = { email, token: response.token };
        setUser(payLoad);
        setUserLocalStorage(payLoad);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };
  
  const logout = async () => {
    setUser(null);
    setUserLocalStorage(null);
  };

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

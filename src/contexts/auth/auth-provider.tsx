import React from "react";
import { AuthProvider } from "./auth-context";

const AuthProviderWrapper = ({ children }: {children: React.ReactNode}) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthProviderWrapper;

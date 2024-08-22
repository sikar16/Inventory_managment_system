import React, { createContext, useContext, useState } from "react";
import { AuthUserInterface, AuthUserContextType } from "../_types/auth_type";

const AuthContext = createContext<AuthUserContextType | null>(null);

const AuthProvider = ({ }: AuthUserInterface) => {
  const []= useState();
};


export const useAuth = () => {
  return useContext(AuthContext);
};

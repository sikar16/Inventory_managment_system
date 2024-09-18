import { useState, useEffect, useContext, createContext } from "react";
import getAuth from "../util/authHeader";
import { AuthContextType, UserDataType } from "../_types/context_type";

// // create auth context
const AuthContext = createContext<AuthContextType | null>(null);

// // prepare auth provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserDataType>({
    firstName: "",
    id: 0,
    role: "",
    token: null
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isDH, setIsDH] = useState(false);
  const [isLS, setIsLS] = useState(false);
  const [isFinance, setIsFinance] = useState(false);
  const [isGM, setIsGM] = useState(false);
  const [isStoreKeeper, setIsStoreKeeper] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const loggedInUser = getAuth();

    loggedInUser.then((response) => {
      if (response != null && response.token != null) {
        setIsLoggedIn(true);
        if (response.role === "ADMIN") {
          setIsAdmin(true);
        } else if (response.role === "EMPLOYEE") {
          setIsEmployee(true);
        } else if (response.role === "DEPARTMENT_HEAD") {
          setIsDH(true);
        } else if (response.role === "LOGESTIC_SUPERVISER") {
          setIsLS(true);
        } else if (response.role === "FINANCE") {
          setIsFinance(true);
        } else if (response.role === "GENERAL_MANAGER") {
          setIsGM(true);
        } else if (response.role === "STORE_KEEPER") {
          setIsStoreKeeper(true);
        }
        setUserData(response);
      }

    });
  };

  const values = {
    isAdmin,
    isDH,
    isLS,
    isFinance,
    isGM,
    isEmployee,
    isStoreKeeper,
    userData,
    setUserData,
    setIsAdmin,
    setIsDH,
    setIsFinance,
    setIsGM,
    setIsLS,
    setIsStoreKeeper,
    fetchData,
    setIsLoggedIn,
    isLoggedIn,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};


// useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useData must be used within a userProvider");
  }
  return context;
};


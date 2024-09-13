import { useState, useEffect, useContext, createContext } from "react";
import getAuth from "../../src/util/authHeader";
// create auth context
const AuthContext = createContext();

// prepare auth provider
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDH, setIsDH] = useState(false);
  const [isLS, setIsLS] = useState(false);
  const [isFinance, setIsFinance] = useState(false);
  const [isGM, setIsGM] = useState(false);
  const [isStoreKeeper, setIsStoreKeeper] = useState(false);
  const [seletedChild, selectChild] = useState({});
  useEffect(() => {

    fetchData();
  }, []);



  const fetchData = async () => {
    const loggedInUser = getAuth();

    loggedInUser.then((response) => {
      // console.log(response);
      if (response.token) {
        setIsLoggedIn(true);
        if (response.role === "ADMIN") {
          setIsAdmin(true);
        } else if (response.role === "DH") {
          setIsDH(true);
        } else if (response.role === "LS") {
          setIsLS(true);
        }
        else if (response.role === "FINANCE") {
          setIsFinance(true);
        }
        else if (response.role === "GM") {
          setIsGM(true);
        }
        else if (response.role === "STOREKEEPER") {
          setIsStoreKeeper(true);
        }
        console.log(response);
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
    seletedChild,
    selectChild,
    isLoggedIn
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

// useAuth
export const useAuth = () => {
  return useContext(AuthContext);
};

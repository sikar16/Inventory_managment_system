export type AuthContextType = {
    isAdmin: boolean;
    isDH: boolean;
    isLS: boolean;
    isFinance: boolean;
    isGM: boolean;
    isEmployee: boolean;
    isStoreKeeper: boolean;
    userData: UserDataType;
    setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDH: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFinance: React.Dispatch<React.SetStateAction<boolean>>;
    setIsGM: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLS: React.Dispatch<React.SetStateAction<boolean>>;
    setIsStoreKeeper: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData: () => void;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    isLoggedIn: boolean;
};


export type UserDataType = {
    id: number;
    firstName: string;
    role: string;
    token: string | null;
};


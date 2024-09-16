
import { useState, useContext, createContext } from "react";
import { ToastContextType, ToastDataType } from "../_types/toast_type";

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toastData, setToastData] = useState<ToastDataType>({
        message: null,
        success: null,
    });

    const showToast = (message: string, success: boolean) => {
        setToastData({ message, success });
    };


    const hideToast = () => {
        setToastData({ message: null, success: null });
    };

    const value = {
        toastData,
        setToastData,
        showToast,
        hideToast,
    };

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

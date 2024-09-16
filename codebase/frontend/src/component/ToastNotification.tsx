// ToastNotification.jsx

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "../context/ToastContext";


const ToastNotification = () => {
    const { toastData, hideToast } = useToast();

    useEffect(() => {
        if (toastData.message !== null) {
            if (toastData.success) {
                toast.success(toastData.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(toastData.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            hideToast();
        }
    }, [toastData, hideToast]);

    return <ToastContainer />;
};

export default ToastNotification;
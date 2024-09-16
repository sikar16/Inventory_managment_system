export interface ToastContextType {
    toastData: ToastDataType;
    setToastData: React.Dispatch<React.SetStateAction<ToastDataType>>;
    showToast: (message: string, success: boolean) => void; // success as boolean
    hideToast: () => void;
}

export interface ToastDataType {
    message: string | null;
    success: boolean | null; // success as boolean
}

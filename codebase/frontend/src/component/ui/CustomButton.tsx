import React from "react";

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type = "button",
  isLoading = false,
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#002A47] w-full py-2 text-white rounded-md hover:bg-[#112737] dark:bg-[#071218] hover:dark:bg-[#0c1920] transition duration-300 ${className}`}
    >
      {isLoading ? <p>Loading</p> : <p>{children}</p>}
    </button>
  );
};

export default CustomButton;

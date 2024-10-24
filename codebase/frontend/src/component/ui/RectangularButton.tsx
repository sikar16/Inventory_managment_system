interface RectangularButtonProps {
  type?: "primary" | "error" | "warning";
  onClick?: () => void;
  children?: React.ReactNode; // Allow for children to be passed
}

const RectangularButton: React.FC<RectangularButtonProps> = ({
  type = "primary",
  onClick,
  children,
}) => {
  const buttonStyles = {
    primary:
      "bg-[#002A47] hover:bg-[#112737] dark:bg-[#071218] hover:dark:bg-[#0c1920]",
    error: "bg-red-600 hover:bg-red-700 dark:bg-red-800 hover:dark:bg-red-900",
    warning:
      "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-800 hover:dark:bg-yellow-900",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${buttonStyles[type]} w-full py-2 text-white rounded-md transition duration-300`}
    >
      {children || <p>submit</p>}
    </button>
  );
};

export default RectangularButton;

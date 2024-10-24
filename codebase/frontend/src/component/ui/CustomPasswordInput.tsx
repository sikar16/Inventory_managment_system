import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface CustomPasswordInputProps {
  register: any; // Adjust type based on your register function
  errors: any; // Adjust type based on your errors object
  id: string;
  placeholder?: string;
}

const CustomPasswordInput: React.FC<CustomPasswordInputProps> = ({
  register,
  errors,
  id,
  placeholder = "Password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mb-4">
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        className={`w-full px-10 py-2 rounded-md text-black dark:text-white outline-none transition 
          border 
          ${errors ? "border-red-600" : "border-gray-300 dark:border-gray-600"} 
          bg-white dark:bg-gray-800 
          focus:border-blue-500 focus:ring focus:ring-blue-300`}
        {...register(id, {
          required: `${placeholder} is required`,
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{8,}$/,
            message: "Invalid password format",
          },
          validate: {
            notAdmin: (fieldValue: string) =>
              fieldValue !== "admin" || "Enter a different password",
          },
        })}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white"
      >
        <path
          fill="#8a8a8a"
          d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1z"
        ></path>
      </svg>
      <div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500  dark:text-white cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </div>
      <p className="text-red-600 text-[13px] mt-1">{errors[id]?.message}</p>
    </div>
  );
};

export default CustomPasswordInput;

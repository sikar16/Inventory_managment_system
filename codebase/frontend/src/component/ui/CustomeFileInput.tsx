import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CustomFileInputFieldProps {
  id: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  iconPath?: string;
  defaultValue?: string;
  isSingle?: boolean;
}

// CustomFileInputField.tsx
const CustomFileInputField: React.FC<CustomFileInputFieldProps> = ({
  id,
  placeholder,
  register,
  error,
  isSingle = true,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = isSingle ? files[0] : files;
      register.onChange({
        target: { value: file },
      });
    }
  };

  return (
    <div className="relative mb-4">
      <p>{placeholder}</p>
      <input
        type="file"
        id={id}
        placeholder={placeholder}
        className={`w-full px-10 py-2 rounded-md text-black dark:text-white outline-none transition 
          border 
          ${error ? "border-red-600" : "border-gray-300 dark:border-gray-600"} 
          bg-white dark:bg-gray-800 
          focus:border-blue-500 focus:ring focus:ring-blue-300`}
        {...register}
        onChange={handleFileChange}
        multiple={!isSingle}
      />
      {error && (
        <p className="text-red-600 text-[13px] mt-1">{error.message}</p>
      )}
    </div>
  );
};
export default CustomFileInputField;

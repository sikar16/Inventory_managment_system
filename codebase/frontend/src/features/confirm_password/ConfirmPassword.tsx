import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import {
  MdNightlight,
  MdLightMode,
  MdBrightnessAuto,
} from "react-icons/md";
import { IoLockClosed, IoEyeOff, IoEye } from "react-icons/io5";
import { useTheme as customTheme } from "../../context/them_context";
import IconContainer from "../../components/icon/Icon_container";

type FormValues = {
  newPassword: string;
  confirmPassword: string;
};

function ConfirmPassword() {
  const form = useForm<FormValues>({
    mode: "onBlur", // Optional: triggers validation on blur
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { register, control, handleSubmit, watch, formState } = form;
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const { themeData, setThemeData } = customTheme();

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  const getThemeIcon = () => {
    if (themeData === "light") {
      return MdNightlight;
    } else if (themeData === "dark") {
      return MdLightMode;
    } else if (themeData === "system") {
      return MdBrightnessAuto;
    }
  };

  const toggleThemeData = () => {
    if (themeData === "light") {
      setThemeData("dark");
    } else if (themeData === "dark") {
      setThemeData("light");
    } else if (themeData === "system") {
      setThemeData("dark");
    }
  };

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  return (
    <>
      <div className="dark:bg-[#002A47] w-full h-screen text-white items-center justify-center">
        <div className="ms-10 pt-5 flex justify-between me-4 md:me-12">
          <img src={logo} alt="Logo" className="w-24 md:w-40" />
          <IconContainer
            handler={toggleThemeData}
            Icon={getThemeIcon()}
            iconsClassName="my-custom-icon-class"
          />
        </div>
        <hr className="h-[1px] dark:bg-gray-600 bg-[#e7eaef] border-none" />
        <div className="w-full max-w-lg p-6 rounded-lg m-auto mt-10 dark:bg-[#002A47] dark:shadow-none bg-white">
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <h3 className="text-3xl font-medium text-[#002a47] dark:text-white">
              Change Password
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="relative mb-6">
              <label
                htmlFor="newPassword"
                className="block text-sm mb-2 text-[#002a47] dark:text-white"
              >
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                placeholder="New Password"
                className="w-full px-6 py-2 rounded-md dark:bg-[#1f4d6d] dark:text-white text-[#002A47] bg-[#fff] focus:outline-none"
                {...register("newPassword", {
                  required: "New Password is required",
                })}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-[#002a47] dark:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEye /> : <IoEyeOff />}
              </div>
              <p className="text-red-600 text-[10px] text-left mt-1">
                {errors.newPassword?.message}
              </p>
            </div>

            <div className="relative mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm mb-2 text-[#002a47] dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-6 py-2 rounded-md dark:bg-[#1f4d6d] dark:text-white text-[#002A47] bg-[#fff] focus:outline-none"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: value =>
                    value === newPassword || "Passwords must match",
                })}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-[#002a47] dark:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEye /> : <IoEyeOff />}
              </div>
              <p className="text-red-600 text-[10px] text-left mt-1">
                {errors.confirmPassword?.message}
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#002A47] text-white dark:bg-[#1f4d6d] px-10 py-2 rounded-md transition"
              >
                Submit
              </button>
            </div>
          </form>

          <DevTool control={control} />
        </div>
      </div>
    </>
  );
}

export default ConfirmPassword;

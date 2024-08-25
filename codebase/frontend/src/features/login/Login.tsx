import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { IoLockClosed, IoEyeOff, IoEye } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useTheme as customTheme } from "../../context/them_context";
import IconContainer from "../../components/icon/Icon_container";

// icons
import {
  MdNightlight,
  MdLightMode,
  MdBrightnessAuto,
} from "react-icons/md";
import { Link } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

function Login() {
  const form = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, control, handleSubmit, formState } = form;
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

  return (
    <>
      <div className="w-full h-screen ">
        <div className="ms-10 pt-3 flex justify-between me-4 md:me-12">
          <img src={logo} alt="Logo" className="w-24 md:w-40" />
          <IconContainer
            handler={toggleThemeData}
            Icon={getThemeIcon()}
            iconsClassName="my-custom-icon-class"
          />
        </div>
        <hr className="h-[1px] dark:bg-gray-600 bg-white border-none" />
        <div className="w-full max-w-md p-6 shadow-md rounded-lg text-center m-auto mt-10 bg-white dark:bg-[#002A47] dark:shadow-none">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <FaRegUser className="mb-4 dark:text-white w-[70px] h-[70px] text-[#002A47]" aria-label="User Icon" />
            <h3 className="text-3xl font-medium">Welcome</h3>
            <h5 className="text-md">Login</h5>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="relative mb-4">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-10 py-2 rounded-md dark:bg-[#1f4d6d] dark:text-white text-[#002A47] bg-[#edf0fc] focus:outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                  validate: {
                    notAdmin: (fieldValue) =>
                      fieldValue !== "admin@example.com" ||
                      "Enter a different email address",
                  },
                })}
              />
              <BsFillPersonFill
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                aria-label="Email Icon"
              />
              <p className="text-red-600 text-[10px] text-left mt-1">
                {errors.email?.message}
              </p>
            </div>

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="w-full px-10 py-2 rounded-md dark:bg-[#1f4d6d] dark:text-white text-[#002A47] bg-[#edf0fc] focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <IoLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2" aria-label="Lock Icon" />
              {showPassword ? (
                <IoEye
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Show Password"
                />
              ) : (
                <IoEyeOff
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Hide Password"
                />
              )}
              <p className="text-red-600 text-[10px] text-left mt-1">
                {errors.password?.message}
              </p>
            </div>
            <div className="flex justify-between mb-4">
              <div className="flex items-center text-gray-500 text-[12px]">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link href="/forgot-password" className="text-gray-500 text-[12px] hover:underline">
                Forgot password?
              </Link>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#002A47] text-white dark:text-white dark:bg-[#1f4d6d] px-10 py-[5px] rounded-md transition"
              >
                Submit
              </button>
            </div>
          </form>
          {/* <DevTool control={control} /> */}
        </div>
      </div>
    </>
  );
}

export default Login;

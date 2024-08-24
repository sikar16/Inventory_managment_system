import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import logo from "../../assets/images/logo.png";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

function Login() {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  return (
    <>
      <div className="w-full h-screen  items-center justify-center">
        <div className="ms-10 pt-5 flex justify-between">
          <img src={logo} alt="" className="w-24 md:w-40" />
        </div>
        <div className="w-full max-w-md p-6 shadow-md rounded-lg text-center m-auto">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={70}
              height={70}
              viewBox="0 0 512 512"
              className="mb-4 text-white"
            >
              <path
                fill="currentColor"
                d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38c-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6M432 480H80a31 31 0 0 1-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75c1.94 10.73-.68 21.34-7.18 29.11A31 31 0 0 1 432 480"
              ></path>
            </svg>
            <h3 className="text-3xl font-medium">Welcome</h3>
            <h5 className="text-md">Login</h5>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="relative mb-4">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-10 py-2  rounded-md  dark:bg-[#002A47] dark:text-white text-[#002A47] bg-white"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                viewBox="0 0 24 24"
                className="absolute left-3 top-1/2 transform -translate-y-1/2  dark:bg-[#002A47] dark:text-white text-[#002A47] bg-white"
              >
                <path
                  fill="#737373"
                  d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                ></path>
              </svg>
              <p className="text-red-600 text-[13px] mt-1">
                {errors.email?.message}
              </p>
            </div>

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="w-full pl-10 pr-12 py-2  rounded-md dark:bg-[#002A47] dark:text-white text-[#002A47] bg-white"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                viewBox="0 0 24 24"
                className="absolute left-3 top-1/2 transform -translate-y-1/2  dark:bg-[#002A47] dark:text-white text-[#002A47] bg-white"
              >
                <path
                  fill="#737373"
                  d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm6-3q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6zM6 20V10z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                viewBox="0 0 24 24"
                className="absolute right-3 top-1/2 transform -translate-y-1/2  dark:bg-[#002A47] dark:text-white text-[#002A47] bg-white cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <path
                  fill="#737373"
                  d={
                    showPassword
                      ? "M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                      : "M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"
                  }
                ></path>
              </svg>
              <p className="text-red-600 text-[13px] mt-1">
                {errors.password?.message}
              </p>
            </div>

            <div className="flex justify-between mb-4">
              <div className="flex items-center  dark:bg-[#002A47] dark:text-white text-[#002A47] bg-white text-[12px]">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <div className="text-gray-500 text-[12px]">
                <label htmlFor="forget">Forget password</label>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#002A47]text-white dark:text-[#002A47] dark:bg-white px-3 py-[3px] rounded-md transition"
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

export default Login;

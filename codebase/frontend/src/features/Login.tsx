import { useForm, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useEffect, useState } from 'react';
import LogoContainer from '../component/LogoContainer';
import { useThemeData } from '../context/them_context';
import { MdNightlight, MdLightMode, MdBrightnessAuto } from 'react-icons/md';
import IconContainer from '../component/icon/Icon_container';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/user_service';
import { useToast } from '../context/ToastContext';

type FormValues = {
  email: string;
  password: string;
};

// Define the LoginResponse type
type LoginResponse = {
  success: boolean;
  token?: string;
  role?: string;
  message?: string;
};


function Login() {

  const { register, control, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const { themeData, setThemeData } = useThemeData();
  const { userData, fetchData } = useAuth();
  const [login, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const { toastData, setToastData } = useToast();
  console.log(toastData)

  useEffect(() => {

    if (userData.token != null) {
      switch (userData.role) {
        case 'ADMIN':
          navigate("/admin");
          break;
        case 'DEPARTMENT_HEAD':
          navigate("/department-head");
          break;
        case 'LOGESTIC_SUPERVISER':
          navigate("/logestics");
          break;
        case 'FINANCE':
          navigate("/finance");
          break;
        case 'GENERAL_MANAGER':
          navigate("/manager");
          break;
        case 'STORE_KEEPER':
          navigate("/warehouse");
          break;
        case 'EMPLOYEE':
          navigate("/employee");
          break;
        default:
          navigate('/'); // Redirect to homepage or default route if role is unknown
          break;
      }
    }


  }, [userData])
  // console.log(userData)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response: LoginResponse = await login(data).unwrap();
      console.log('API Response:', response); // Log the entire response

      setToastData({
        message: response.message || "",
        success: response.success,
      }
      );

      if (response.success) {
        // Log the role from the response
        localStorage.setItem(
          "token",
          JSON.stringify({ token: response.token })
        );
        // localStorage.setItem(
        //   "token",
        //   `${response.token}`
        // );
        fetchData()

        // Redirect based on user role
        switch (response.role) {
          case 'ADMIN':
            navigate("/admin");
            break;
          case 'DEPARTMENT_HEAD':
            navigate("/department-head");
            break;
          case 'LOGESTIC_SUPERVISER':
            navigate("/logestics");
            break;
          case 'FINANCE':
            navigate("/finance");
            break;
          case 'GENERAL_MANAGER':
            navigate("/manager");
            break;
          case 'STORE_KEEPER':
            navigate("/warehouse");
            break;
          case 'EMPLOYEE':
            navigate("/employee");
            break;
          default:
            navigate('/'); // Redirect to homepage or default route if role is unknown
            break;
        }
      } else {
        // console.error('Login failed. Response does not have a success property:', response);
      }
    } catch (error: any) {
      // console.error("An error occurred:", error);
      setToastData({
        message: error.message,
        success: error.success,
      }
      );
    }
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
      <div className='bg-[#002A47] text-white dark:bg-[#1C1E22] dark:text-[#B7E4FF] w-full h-screen '>
        <div className='ms-10 pt-2 flex justify-between me-10 items-center'>
          <LogoContainer />
          <IconContainer
            handler={toggleThemeData}
            Icon={getThemeIcon()}
            iconsClassName="my-custom-icon-class"
            children={null}
          />
        </div>
        <div className='w-full max-w-md p-6 shadow-md rounded-lg text-center m-auto'>
          <div className='flex flex-col items-center justify-center text-center mb-8'>
            <svg xmlns="http://www.w3.org/2000/svg" width={70} height={70} viewBox="0 0 512 512" className='mb-4 text-white'>
              <path fill="currentColor" d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38c-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6M432 480H80a31 31 0 0 1-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75c1.94 10.73-.68 21.34-7.18 29.11A31 31 0 0 1 432 480"></path>
            </svg>
            <h3 className='text-3xl font-medium'>Welcome</h3>
            <h5 className='text-md'>Login</h5>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='relative mb-4'>
              <input
                type="email"
                id="email"
                placeholder='Email'
                className='w-full px-10 py-2 rounded-md text-black'
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" },
                  validate: {
                    notAdmin: (fieldValue) => fieldValue !== "admin@example.com" || "Enter a different email address"
                  }
                })}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 24 24" className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                <path fill="#737373" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"></path>
              </svg>
              <p className="text-red-600 text-[13px] mt-1">{errors.email?.message}</p>
            </div>
            <div className='relative mb-4'>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder='Password'
                className='w-full px-10 py-2 rounded-md text-black'
                {...register("password", { required: "Password is required" })}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                viewBox="0 0 24 24"
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                onClick={() => setShowPassword(!showPassword)}
              >
                <path fill="#737373" d="M12 6c-5.33 0-10 4.5-10 10s4.67 10 10 10 10-4.5 10-10-4.67-10-10-10Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Zm0-11.8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm0 2.4c1.5 0 2.7-1.2 2.7-2.7 0-.56-.17-1.07-.46-1.5.43-.47.76-1.07.76-1.8 0-1.24-1-2.2-2.2-2.2-1.2 0-2.2 1-2.2 2.2 0 .73.33 1.33.76 1.8-.29.43-.46.94-.46 1.5 0 1.5 1.2 2.7 2.7 2.7Z"></path>
              </svg>
              <p className="text-red-600 text-[13px] mt-1">{errors.password?.message}</p>
            </div>
            <button
              type="submit"
              className='w-full bg-[#002A47] rounded-md text-white py-2 mt-3 hover:bg-[#0e2432]'
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
        <DevTool control={control} />
      </div>
    </>
  );
}

export default Login;

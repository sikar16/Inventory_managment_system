import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import { useState } from 'react';
import LogoContainer from '../component/LogoContainer';
import { useThemeData } from '../context/them_context';
import {
    MdNightlight,
    MdLightMode,
    MdBrightnessAuto,
} from "react-icons/md";
import IconContainer from '../component/icon/Icon_container';
type FormValues = {
    newPassword: string;
    confirmPassword: string;
};

function ConfirmPassword() {
    const form = useForm<FormValues>();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    const [showPassword, setShowPassword] = useState(false);
    const { themeData, setThemeData } = useThemeData();

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
        // console.log(`....${themeData}`);
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
            <div className='bg-[#002A47] text-white dark:bg-[#1C1E22] dark:text-[#B7E4FF]  w-full h-screen  items-center justify-center'>
                <div className='ms-4 pt-2 flex justify-between  me-10 items-center'>
                    <div className="flex items-center justify-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path fill="white" d="M10 21.308L.692 12L10 2.692l1.064 1.064L2.819 12l8.244 8.244z"></path>
                        </svg>
                        <LogoContainer />
                    </div>

                    <div>
                        <IconContainer
                            handler={toggleThemeData}
                            Icon={getThemeIcon()}
                            iconsClassName="my-custom-icon-class"
                            children={null}
                        />
                    </div>
                </div>
                <div className='w-full max-w-lg p-10 shadow-md rounded-lg  m-auto'>
                    <div className='flex flex-col items-center justify-center text-center mb-10'>
                        <h3 className='text-3xl font-medium'>Change Password</h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className='relative mb-5 '>
                            <label htmlFor="">New password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder='New Password'
                                className='w-full pl-3 pr-12 py-2 mt-2  rounded-md text-black'
                                {...register("newPassword", {
                                    required: "New password is required",
                                })}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={25}
                                viewBox="0 0 24 24"
                                className='absolute right-3 top-3/4 transform -translate-y-1/2 text-gray-500 cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <path fill="#737373" d={showPassword ? "M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" : "M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"}
                                ></path>
                            </svg>
                            <p className="text-red-600 text-[13px] mt-1">{errors.newPassword?.message}</p>
                        </div>
                        <div className='relative mb-4 '>
                            <label htmlFor="">Confirm password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder='Confirm Password'
                                className='w-full pl-3 pr-12 py-2 mt-2 rounded-md text-black'
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                })}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={25}
                                viewBox="0 0 24 24"
                                className='absolute right-3 top-3/4 transform -translate-y-1/2 text-gray-500 cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <path fill="#737373" d={showPassword ? "M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" : "M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"}
                                ></path>
                            </svg>
                            <p className="text-red-600 text-[13px] mt-1">{errors.confirmPassword?.message}</p>
                        </div>
                        <div className='flex justify-center mt-12'>
                            <button type="submit" className='bg-white text-[#002A47] dark:bg-[#B7E4FF] dark:text-black px-4 py-[6px] rounded-md transition'>
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

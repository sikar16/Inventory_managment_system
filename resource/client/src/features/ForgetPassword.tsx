import LogoContainer from '../component/LogoContainer';
import { useThemeData } from '../context/them_context';
import {
    MdNightlight,
    MdLightMode,
    MdBrightnessAuto,
} from "react-icons/md";
import IconContainer from '../component/icon/Icon_container';
function ForgetPassword() {
    const { themeData, setThemeData } = useThemeData();

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
        <div className='bg-[#002A47] text-white w-full h-screen dark:bg-[#1C1E22] dark:text-[#B7E4FF]  items-center justify-center'>
            <div className='ms-10 pt-2 flex justify-between me-10 items-center'>
                <LogoContainer />
                <IconContainer
                    handler={toggleThemeData}
                    Icon={getThemeIcon()}
                    iconsClassName="my-custom-icon-class"
                />            </div>
            <div className='w-full max-w-md p-6 shadow-md dark:shadow-neutral-100 rounded-lg  text-center mt-10 m-auto'>
                <div className='flex flex-col items-center justify-center mb-8'>
                    <h3 className='text-4xl font-medium mb-6'>Forget Password</h3>
                    <h5 className='text-[12px] text-gray-500 mb-2'>Sending verification code to your email:</h5>
                    <p className='text-gray-500 text-[11px]'>example@gmail.com</p>
                </div>
                <div className='flex mb-2 md:mb-6 justify-center'>
                    {[...Array(6)].map((_, index) => (
                        <input
                            key={index}
                            maxLength={1}
                            className='mx-1 w-8  h-8 md:w-12 md:h-12 bg-white text-black rounded-md text-center border border-gray-300 focus:outline-none'
                        />
                    ))}
                </div>
                <form className='pt-10'>
                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className='bg-white text-[#002A47] dark:bg-[#B7E4FF] dark:text-black px-6 py-2 rounded-md font-medium transition'>
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;

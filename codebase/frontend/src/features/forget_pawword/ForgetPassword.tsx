import logo from "../../assets/images/logo.png";
import {
  MdNightlight,
  MdLightMode,
  MdBrightnessAuto,
} from "react-icons/md";
import { useTheme as customTheme } from "../../context/them_context";
import IconContainer from "../../components/icon/Icon_container";

function ForgetPassword() {
  const { themeData, setThemeData } = customTheme();
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
    console.log(`....${themeData}`);
    if (themeData === "light") {
      setThemeData("dark");
    } else if (themeData === "dark") {
      setThemeData("light");
    } else if (themeData === "system") {
      setThemeData("dark");
    }
  };

  return (
    <div className="dark:bg-[#002A47] dark:text-white bg-white text-[#002A47] w-full h-screen   items-center justify-center">
      <div className="ms-10 pt-5 flex justify-between me-4 md:me-12">
        <img src={logo} alt="" className="w-24 md:w-40" />
        <IconContainer
          handler={toggleThemeData}
          Icon={getThemeIcon()}
          iconsClassName="my-custom-icon-class"
        />
      </div>
      <hr className="h-[1px] dark:bg-gray-600 bg-[#edf0fc] border-none" />
      <div className="w-full max-w-md p-6 rounded-lg text-white text-center mt-10 m-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <h3 className="text-4xl font-medium mb-6 text-[#002a47] dark:text-white">Forget Password</h3>
          <h5 className="text-[12px] text-gray-500 mb-2">
            Sending verification code to your email:
          </h5>
          <p className="text-gray-500 text-[11px]">example@gmail.com</p>
        </div>
        <div className="flex mb-2 md:mb-6 justify-center">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              maxLength={1}
              className="mx-1 w-8  h-8 md:w-12 md:h-12 dark:bg-white bg-[#edf0fc] text-black rounded-md text-center border border-gray-300 focus:outline-none"
            />
          ))}
        </div>
        <form className="pt-10">
          <div className="flex justify-center">
            <button
              type="submit"
              className="dark:bg-white dark:text-[#002A47] bg-[#002A47] text-white  px-8 py-2 rounded-md  transition"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;

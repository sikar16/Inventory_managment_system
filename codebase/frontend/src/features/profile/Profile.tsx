import { useForm } from "react-hook-form";
import logo from "../../assets/images/logo.jpg";
import profile from "../../assets/images/profile.jpg";
import email from "../../assets/images/mail.png";
import { useTheme as customTheme } from "../../context/them_context";
import { MdNightlight, MdLightMode, MdBrightnessAuto } from "react-icons/md";
import IconContainer from "../../components/icon/Icon_container";

function Profile() {
  const { themeData, setThemeData } = customTheme();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
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
    <div className={`items-center justify-center ${themeData === "dark" ? "dark:bg-[#002A47] dark:text-[#edf0fc]" : "bg-white text-[#002A47]"}`}>
      <div className="ms-10 pt-3 flex justify-between me-4 md:me-12">
        <img src={logo} alt="Logo" className="w-24 md:w-40" />
        <IconContainer
          handler={toggleThemeData}
          Icon={getThemeIcon()}
          iconsClassName="my-custom-icon-class"
        />
      </div>
      <hr className="h-[1px] dark:bg-gray-600 bg-white border-none" />

      <hr className={`h-[1px] ${themeData === "dark" ? "dark:bg-gray-600" : "bg-[#edf0fc]"} border-none`} />
      <div className="w-full min-h-screen px-5 pt-5">
        <div className="rounded-sm pb-10 pt-8 ps-4">
          <div className="flex flex-col-2 justify-between">
            <div className="ps-5 pt-2">
              <p className="text-lg">Welcome, Zerubabel</p>
              <p className="text-[#ADA7A7] text-sm">{formattedDate}</p>
            </div>
            <div className="flex pt-5 pe-4">
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                <path fill="black" fillRule="evenodd" d="M16.125 12a.75.75 0 0 0-.75-.75H4.402l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68h10.972a.75.75 0 0 0 .75-.75" clipRule="evenodd"></path>
                <path fill="black" d="M9.375 8c0 .702 0 1.053.169 1.306a1 1 0 0 0 .275.275c.253.169.604.169 1.306.169h4.25a2.25 2.25 0 0 1 0 4.5h-4.25c-.702 0-1.053 0-1.306.168a1 1 0 0 0-.275.276c-.169.253-.169.604-.169 1.306c0 2.828 0 4.243.879 5.121c.878.879 2.292.879 5.12.879h1c2.83 0 4.243 0 5.122-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121S19.203 2 16.375 2h-1c-2.829 0-4.243 0-5.121.879c-.879.878-.879 2.293-.879 5.121"></path>
              </svg>
              <p className="ms-2 text-sm">Logout</p>
            </div>
          </div>

          <div className="flex flex-col justify-center sm:flex-row sm:justify-between items-center ms-8 mt-6 gap-4">
            <div className="sm:flex justify-center items-center">
              <div className="text-center">
                <img src={profile} alt="" width={100} height={100} className="rounded-full mx-auto" />
              </div>
              <div className="ms-4 text-center sm:text-left">
                <p className="text-xl pt-2">Zerubabel Damtew</p>
                <p className="text-[#ADA7A7] text-sm">zerubabel@gmail.com</p>
                <p className="text-[#ADA7A7] text-sm">Finance</p>
              </div>
            </div>

            <div className="sm:me-5 m-auto">
              <button
                type="submit"
                className="bg-[#002A47] text-white dark:text-white dark:bg-[#1f4d6d] px-10 py-[5px] rounded-md transition"
              >
                Edit
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5">
              <div className="w-[80%] md:w-[30%]">
                <label htmlFor="firstName" className="block text-sm font-normal text-gray-700 dark:text-white ">First Name</label>
                <input
                  placeholder="Your first name"
                  type="text"
                  id="firstName"
                  {...register("firstName", { required: "First name is required" })}
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
                {errors.firstName && <p className="text-red-600 text-xs">{errors.firstName?.message}</p>}
              </div>
              <div className="w-[80%] md:w-[30%]">
                <label htmlFor="middleName" className="block text-sm font-normal text-gray-700 dark:text-white">Middle Name</label>
                <input
                  placeholder="Your middle name"
                  type="text"
                  id="middleName"
                  {...register("middleName")}
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
              </div>
              <div className="w-[80%] md:w-[30%]">
                <label htmlFor="lastName" className="block text-sm font-normal text-gray-700 dark:text-white">Last Name</label>
                <input
                  placeholder="Your last name"
                  type="text"
                  id="lastName"
                  {...register("lastName", { required: "Last name is required" })}
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
                {errors.lastName && <p className="text-red-600 text-xs">{errors.lastName?.message}</p>}
              </div>
            </div>
            <div className="w-[80%] md:w-[30%] mx-5 my-5">
              <label htmlFor="phone" className="block text-sm font-normal text-gray-700 dark:text-white">Phone Number</label>
              <input
                type="text"
                id="phone"
                {...register("phone", { required: "Phone number is required" })}
                className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
              />
              {errors.phone && <p className="text-red-600 text-xs">{errors.phone?.message}</p>}
            </div>
            <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-4 gap-3 mx-5">
              <div className="w-[80%] md:w-[30%]">
                <label htmlFor="country" className="block text-sm font-normal text-gray-700 dark:text-white">Country</label>
                <input
                  type="text"
                  id="country"
                  {...register("country", { required: "Country is required" })}
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
                {errors.country && <p className="text-red-600 text-xs">{errors.country?.message}</p>}
              </div>
              <div className="w-[80%] md:w-[30%]">
                <label htmlFor="city" className="block text-sm font-normal text-gray-700 dark:text-white">City</label>
                <input
                  type="text"
                  id="city"
                  {...register("city", { required: "City is required" })}
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
                {errors.city && <p className="text-red-600 text-xs">{errors.city?.message}</p>}
              </div>
              <div className="w-[80%] md:w-[30%]">
                <label htmlFor="subcity" className="block text-sm font-normal text-gray-700 dark:text-white" >Sub-city</label>
                <input
                  type="text"
                  id="subcity"
                  {...register("subcity", { required: "Sub-city is required" })}
                  className="mt-1 text-sm ps-3 block w-full rounded-md border-gray-300 shadow-sm bg-slate-100 py-[7px]"
                />
                {errors.subcity && <p className="text-red-600 text-xs">{errors.subcity?.message}</p>}
              </div>
            </div>
            <div className="flex mt-20 gap-2 px-10">
              <img src={email} alt="" width={28} />
              <p className="text-gray-400 text-sm">zerubabel@gmail.com</p>
              <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 48 48">
                <g fill="none" stroke="gray" strokeLinejoin="round" strokeWidth={2}>
                  <path strokeLinecap="round" d="M7 42H43"></path>
                  <path fill="white" d="M11 26.7199V34H18.3172L39 13.3081L31.6951 6L11 26.7199Z"></path>
                </g>
              </svg>
            </div>
            <button
              type="submit"
              className="bg-[#002A47] text-white dark:text-white dark:bg-[#1f4d6d] px-16 py-[5px] rounded-md transition mt-10"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;

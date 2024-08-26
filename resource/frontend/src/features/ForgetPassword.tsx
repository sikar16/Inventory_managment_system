import logo from '../assets/logo.png';
import LogoContainer from '../component/LogoContainer';

function ForgetPassword() {
    return (
        <div className='bg-[#002A47] w-full h-screen text-white  items-center justify-center'>
            <div className='ms-10 pt-5 flex justify-between'>
                <LogoContainer />
                <svg className='me-10' xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20"><path fill="#ffffff" d="M8.6 3.4L14.2 9H2v2h12.2l-5.6 5.6L10 18l8-8l-8-8z"></path></svg>
            </div>
            <div className='w-full max-w-md p-6 shadow-md rounded-lg text-white text-center mt-10 m-auto'>
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
                            className='bg-white text-[#002A47] px-6 py-2 rounded-md font-medium transition'>
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;

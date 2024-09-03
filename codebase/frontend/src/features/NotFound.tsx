import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="bg-[#F3F3F6] text-[#002A47]   relative flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat" >
            <div className="relative  text-center text-[#002A47]  max-w-lg mx-auto">
                <h1 className="text-8xl md:text-9xl font-bold tracking-wider mb-4 animate-pulse">404</h1>
                <p className="text-lg md:text-2xl font-light mb-8">
                    Oops! The page you’re looking for doesn’t exist.
                </p>
                <Link to="/" className="px-8 py-3 text-sm md:text-lg font-medium text-white bg-[#002A47]   rounded shadow-lg hover:shadow-2xl transform transition hover:scale-105">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;

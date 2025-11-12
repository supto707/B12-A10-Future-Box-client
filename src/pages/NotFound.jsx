import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">404</h1>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Page Not Found</h2>
          <p className="text-gray-600 mb-10 text-xl">Oops! The page you're looking for doesn't exist.</p>
        </div>
        <Link to="/" className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

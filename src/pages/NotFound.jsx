import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <img 
        src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=500" 
        alt="404" 
        className="w-64 h-64 object-cover rounded-full mb-8"
      />
      <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;

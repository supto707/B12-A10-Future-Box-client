import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'hover:text-orange-500'}>Home</NavLink>
      <NavLink to="/all-reviews" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'hover:text-orange-500'}>All Reviews</NavLink>
      {user && (
        <>
          <NavLink to="/add-review" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'hover:text-orange-500'}>Add Review</NavLink>
          <NavLink to="/my-reviews" className={({ isActive }) => isActive ? 'text-orange-500 font-semibold' : 'hover:text-orange-500'}>My Reviews</NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-orange-600">🍜 FoodLovers</Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks}
            {user ? (
              <div className="relative">
                <img 
                  src={user.photoURL || 'https://via.placeholder.com/40'} 
                  alt="User" 
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-orange-500"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <Link to="/add-review" className="block px-4 py-2 hover:bg-gray-100">Add Review</Link>
                    <Link to="/my-reviews" className="block px-4 py-2 hover:bg-gray-100">My Reviews</Link>
                    <Link to="/my-favorites" className="block px-4 py-2 hover:bg-gray-100">My Favorites</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">Login</Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4">
            {navLinks}
            {user ? (
              <>
                <Link to="/my-favorites" className="hover:text-orange-500">My Favorites</Link>
                <button onClick={handleLogout} className="text-left text-red-600">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-orange-500 text-white px-6 py-2 rounded-lg text-center">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

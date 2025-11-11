import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">🍜 FoodLovers</h3>
            <p className="text-gray-400">Connecting food enthusiasts to discover and share amazing local food experiences.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gray-400 hover:text-orange-500">Home</Link>
              <Link to="/all-reviews" className="text-gray-400 hover:text-orange-500">All Reviews</Link>
              <Link to="/add-review" className="text-gray-400 hover:text-orange-500">Add Review</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="text-gray-400 hover:text-orange-500"><FaFacebook /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500"><FaXTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500"><FaInstagram /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500"><FaYoutube /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Local Food Lovers Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

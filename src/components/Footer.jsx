import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">🍜 FoodLovers</h3>
            <p className="text-gray-300 leading-relaxed">Connecting food enthusiasts to discover and share amazing local food experiences.</p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6 text-orange-500">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-gray-300 hover:text-orange-500 transition-colors hover:translate-x-2 inline-block">→ Home</Link>
              <Link to="/all-reviews" className="text-gray-300 hover:text-orange-500 transition-colors hover:translate-x-2 inline-block">→ All Reviews</Link>
              <Link to="/add-review" className="text-gray-300 hover:text-orange-500 transition-colors hover:translate-x-2 inline-block">→ Add Review</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6 text-orange-500">Follow Us</h4>
            <div className="flex gap-4 text-3xl">
              <a href="#" className="text-gray-300 hover:text-orange-500 hover:scale-125 transition-all"><FaFacebook /></a>
              <a href="#" className="text-gray-300 hover:text-orange-500 hover:scale-125 transition-all"><FaXTwitter /></a>
              <a href="#" className="text-gray-300 hover:text-orange-500 hover:scale-125 transition-all"><FaInstagram /></a>
              <a href="#" className="text-gray-300 hover:text-orange-500 hover:scale-125 transition-all"><FaYoutube /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-lg">&copy; 2024 Local Food Lovers Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

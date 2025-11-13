import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-orange-500/20 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">🍜 FoodLovers</h3>
            <p className="text-gray-400">Connecting food enthusiasts to discover and share amazing local food experiences.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 className="text-xl font-bold mb-4 text-orange-500">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gray-400 hover:text-orange-500 transition hover:translate-x-2 inline-block">→ Home</Link>
              <Link to="/all-reviews" className="text-gray-400 hover:text-orange-500 transition hover:translate-x-2 inline-block">→ All Reviews</Link>
              <Link to="/add-review" className="text-gray-400 hover:text-orange-500 transition hover:translate-x-2 inline-block">→ Add Review</Link>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="text-xl font-bold mb-4 text-orange-500">Follow Us</h4>
            <div className="flex gap-4 text-3xl">
              <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="#" className="text-gray-400 hover:text-orange-500 transition"><FaFacebook /></motion.a>
              <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="#" className="text-gray-400 hover:text-orange-500 transition"><FaXTwitter /></motion.a>
              <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="#" className="text-gray-400 hover:text-orange-500 transition"><FaInstagram /></motion.a>
              <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="#" className="text-gray-400 hover:text-orange-500 transition"><FaYoutube /></motion.a>
            </div>
          </motion.div>
        </div>
        
        <div className="border-t border-orange-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-lg">&copy; 2024 Local Food Lovers Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

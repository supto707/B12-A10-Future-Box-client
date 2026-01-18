import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-orange-500/20 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-6">🍜 FoodLovers</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">Connecting food enthusiasts to discover and share amazing local food experiences.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-all hover:translate-x-2 inline-block font-medium">Home</Link>
              <Link to="/all-reviews" className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-all hover:translate-x-2 inline-block font-medium">All Reviews</Link>
              <Link to="/dashboard/add-review" className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-all hover:translate-x-2 inline-block font-medium">Add Review</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Follow Us</h4>
            <div className="flex gap-4">
              {[FaFacebook, FaXTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="#"
                  className="w-10 h-10 rounded-full bg-orange-100 dark:bg-gray-800 text-orange-500 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all shadow-md"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-500 font-medium">&copy; 2024 Local Food Lovers Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

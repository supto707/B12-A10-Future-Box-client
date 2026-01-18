import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-orange-500/50 transition-all"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <FaSun className="text-xl" />
            ) : (
                <FaMoon className="text-xl" />
            )}
        </motion.button>
    );
};

export default ThemeToggle;

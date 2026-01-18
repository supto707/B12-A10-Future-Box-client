import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    className = '',
    onClick,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/50",
        secondary: "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700",
        outline: "bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500/10",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-gray-800"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            disabled={isLoading || props.disabled}
            onClick={onClick}
            {...props}
        >
            {isLoading ? (
                <>
                    <FaSpinner className="animate-spin mr-2" />
                    Loading...
                </>
            ) : children}
        </motion.button>
    );
};

export default Button;

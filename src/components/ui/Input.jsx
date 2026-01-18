import { motion, AnimatePresence } from 'framer-motion';

const Input = ({
    label,
    error,
    className = '',
    id,
    type = 'text',
    ...props
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-gray-300 mb-2 font-medium"
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={`
          w-full px-5 py-3 rounded-xl bg-gray-900 border-2 
          transition-all duration-300 outline-none
          ${error
                        ? 'border-red-500 focus:ring-4 focus:ring-red-500/20'
                        : 'border-orange-500/20 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20'
                    }
          text-white placeholder-gray-500
        `}
                {...props}
            />
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1 ml-1"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Input;

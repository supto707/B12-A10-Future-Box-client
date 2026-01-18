import { motion } from 'framer-motion';
import { FaUsers, FaUtensils, FaMapMarkedAlt, FaStar } from 'react-icons/fa';

const Stats = () => {
    const stats = [
        { icon: <FaUsers />, count: '5,000+', label: 'Active Foodies' },
        { icon: <FaUtensils />, count: '12,000+', label: 'Reviews Shared' },
        { icon: <FaMapMarkedAlt />, count: '50+', label: 'Cities Covered' },
        { icon: <FaStar />, count: '4.8', label: 'Average Rating' }
    ];

    return (
        <section className="py-20 bg-white dark:bg-black border-y border-gray-100 dark:border-orange-500/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-orange-500/20 hover:border-orange-500/50 transition-all card-hover"
                        >
                            <div className="text-4xl mb-4 text-orange-500 flex justify-center">{stat.icon}</div>
                            <h3 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">{stat.count}</h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;

import { motion } from 'framer-motion';
import { FaSearch, FaCommentAlt, FaShareAlt } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaSearch />,
            title: 'Discover',
            desc: 'Browse through thousands of authentic food reviews from your local area.'
        },
        {
            icon: <FaCommentAlt />,
            title: 'Review',
            desc: 'Share your own dining experiences with detailed ratings and photos.'
        },
        {
            icon: <FaShareAlt />,
            title: 'Connect',
            desc: 'Follow other foodies, create lists, and build your food community.'
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-black relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        How It Works
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Start your food journey in three simple steps
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent -translate-y-1/2 z-0"></div>

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative z-10 bg-white dark:bg-gray-900 p-8 rounded-3xl text-center shadow-xl border border-gray-100 dark:border-gray-800 hover:border-orange-500/50 transition-all group"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-3xl text-white transform group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-orange-500/30">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>

                            <div className="absolute -top-4 -right-4 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-orange-500 border border-orange-500/20">
                                {idx + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;

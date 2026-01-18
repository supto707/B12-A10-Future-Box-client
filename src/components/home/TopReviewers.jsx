import { motion } from 'framer-motion';
import { FaTrophy, FaStar } from 'react-icons/fa';

const TopReviewers = () => {
    const reviewers = [
        {
            name: 'Jessica Parker',
            reviews: 145,
            followers: '2.5k',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
            tag: 'Elite Reviewer'
        },
        {
            name: 'David Wilson',
            reviews: 120,
            followers: '1.8k',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
            tag: 'Top Contributor'
        },
        {
            name: 'Anna Lee',
            reviews: 98,
            followers: '1.2k',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80',
            tag: 'Rising Star'
        },
        {
            name: 'Robert Brown',
            reviews: 87,
            followers: '900+',
            image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80',
            tag: 'Food Expert'
        }
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-orange-500/10">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <FaTrophy className="text-4xl text-yellow-500" />
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Top Reviewers
                        </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Meet the community members leading the food revolution
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {reviewers.map((reviewer, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-black p-6 rounded-2xl text-center shadow-lg border border-gray-100 dark:border-gray-800 hover:border-orange-500/50 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                            <div className="relative inline-block mb-4">
                                <img
                                    src={reviewer.image}
                                    alt={reviewer.name}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-gray-800 group-hover:border-orange-500 transition-colors"
                                />
                                <div className="absolute -bottom-2 right-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                                    #{idx + 1}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">{reviewer.name}</h3>
                            <p className="text-sm text-orange-500 font-medium mb-4">{reviewer.tag}</p>

                            <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
                                <div className="text-center">
                                    <span className="block font-bold text-gray-800 dark:text-white text-lg">{reviewer.reviews}</span>
                                    Reviews
                                </div>
                                <div className="w-px bg-gray-200 dark:bg-gray-800"></div>
                                <div className="text-center">
                                    <span className="block font-bold text-gray-800 dark:text-white text-lg">{reviewer.followers}</span>
                                    Followers
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopReviewers;

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaUser } from 'react-icons/fa';

const BlogPreview = () => {
    const posts = [
        {
            id: 1,
            title: 'Top 10 Hidden Gem Restaurants in 2024',
            excerpt: 'Discover the secret spots that locals love but tourists often miss. From cozy cafes to underground diners.',
            image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80',
            date: 'Jan 15, 2024',
            author: 'Alex Morgan',
            category: 'Guides'
        },
        {
            id: 2,
            title: 'The Ultimate Street Food Guide',
            excerpt: 'A comprehensive guide to navigating street food markets safely and finding the most delicious bites.',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
            date: 'Jan 12, 2024',
            author: 'Lisa Wang',
            category: 'Tips'
        },
        {
            id: 3,
            title: 'How to Take Better Food Photos',
            excerpt: 'Level up your food photography game with these simple lighting and composition tricks.',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
            date: 'Jan 10, 2024',
            author: 'Chris Green',
            category: 'Photography'
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Latest Food Stories
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Tips, guides, and inspiration for your next meal
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="hidden md:block"
                    >
                        <Link to="/blog" className="flex items-center gap-2 text-orange-500 font-bold hover:gap-3 transition-all">
                            Read All Stories <FaArrowRight />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-orange-500/10 transition-all group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <span className="flex items-center gap-1"><FaCalendarAlt /> {post.date}</span>
                                    <span className="flex items-center gap-1"><FaUser /> {post.author}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                                    {post.excerpt}
                                </p>
                                <Link to={`/blog/${post.id}`} className="text-orange-500 font-bold hover:text-red-500 transition-colors inline-flex items-center gap-1">
                                    Read More <FaArrowRight className="text-sm" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;

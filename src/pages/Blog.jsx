import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaArrowRight, FaTag } from 'react-icons/fa';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: 'Top 10 Hidden Gem Restaurants in 2024',
            excerpt: 'Discover the secret spots that locals love but tourists often miss. From cozy cafes to underground diners, this list covers the best kept secrets in the culinary world.',
            image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80',
            date: 'Jan 15, 2024',
            author: 'Alex Morgan',
            category: 'Guides'
        },
        {
            id: 2,
            title: 'The Ultimate Street Food Guide',
            excerpt: 'A comprehensive guide to navigating street food markets safely and finding the most delicious bites. Tips on hygiene, ordering, and etiquette included.',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
            date: 'Jan 12, 2024',
            author: 'Lisa Wang',
            category: 'Tips'
        },
        {
            id: 3,
            title: 'How to Take Better Food Photos',
            excerpt: 'Level up your food photography game with these simple lighting and composition tricks. Perfect for sharing your reviews on FoodLovers.',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
            date: 'Jan 10, 2024',
            author: 'Chris Green',
            category: 'Photography'
        },
        {
            id: 4,
            title: 'The Rise of Plant-Based Dining',
            excerpt: 'Exploring the growing trend of vegan and vegetarian restaurants. How chefs are innovating with plant-based ingredients to create amazing flavors.',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
            date: 'Jan 08, 2024',
            author: 'Sarah Jenkins',
            category: 'Trends'
        },
        {
            id: 5,
            title: 'Spicy Food Challenge: Can You Handle Heat?',
            excerpt: 'We visited the spiciest restaurants in town to test our endurance. Read about our fiery experience and find out where to get the hottest wings.',
            image: 'https://images.unsplash.com/photo-1519624028054-949313cc0f8c?w=600&q=80',
            date: 'Jan 05, 2024',
            author: 'Mike Ross',
            category: 'Experiences'
        },
        {
            id: 6,
            title: 'Dessert Trends to Watch This Year',
            excerpt: 'From cronuts to mochi donuts, we look at the sweet treats taking over social media feeds. Get ready for a sugar rush!',
            image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80',
            date: 'Jan 02, 2024',
            author: 'Emma Watson',
            category: 'Trends'
        }
    ];

    return (
        <div className="bg-white dark:bg-black min-h-screen transition-colors duration-300 py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        Foodie Blog
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Updates, stories, and guides from the world of culinary delights
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold uppercase flex items-center gap-1 shadow-lg">
                                    <FaTag /> {post.category}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <span className="flex items-center gap-1"><FaCalendar /> {post.date}</span>
                                    <span className="flex items-center gap-1"><FaUser /> {post.author}</span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 flex-grow">
                                    {post.excerpt}
                                </p>

                                <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-orange-500 font-bold hover:gap-3 transition-all">
                                    Read Article <FaArrowRight />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Categories Section */}
                <div className="mt-20 border-t border-gray-100 dark:border-gray-800 pt-12">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Popular Categories</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Guides', 'Tips', 'Photography', 'Trends', 'Experiences', 'Recipes', 'Interviews'].map((cat) => (
                            <button
                                key={cat}
                                className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white transition-all font-medium border border-transparent hover:border-orange-500"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;

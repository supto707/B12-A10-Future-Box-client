import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="bg-white dark:bg-black min-h-screen transition-colors duration-300">
            {/* Hero Section */}
            <div className="relative h-[400px]">
                <img
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920&q=80"
                    alt="Restaurant interior"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white p-4"
                    >
                        <h1 className="text-5xl font-bold mb-4">About Us</h1>
                        <p className="text-xl max-w-2xl mx-auto">
                            Connecting food lovers with the best local flavors since 2024.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                            At Local Food Lovers Network, we believe that food is more than just sustenance—it's a story, a memory, and a way to connect. Our mission is to build a community where everyone can share their culinary adventures and discover hidden gems nearby.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            We empower local businesses by giving them a platform to shine through the authentic voices of their customers. Whether you're a critic, a chef, or just someone who loves a good meal, you have a place here.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                            alt="Friends eating"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

                {/* Stats Section */}
                <div className="my-20 bg-gray-50 dark:bg-gray-900 rounded-3xl p-12 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-5xl font-bold text-orange-500 mb-2">50k+</h3>
                            <p className="text-gray-600 dark:text-gray-400">Reviews Shared</p>
                        </div>
                        <div>
                            <h3 className="text-5xl font-bold text-orange-500 mb-2">10k+</h3>
                            <p className="text-gray-600 dark:text-gray-400">Monthly Users</p>
                        </div>
                        <div>
                            <h3 className="text-5xl font-bold text-orange-500 mb-2">500+</h3>
                            <p className="text-gray-600 dark:text-gray-400">Partner Restaurants</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

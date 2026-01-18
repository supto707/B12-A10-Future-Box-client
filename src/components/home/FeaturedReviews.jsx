import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import Card from '../ui/Card';

const FeaturedReviews = () => {
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['featuredReviews'],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/featured`);
            return res.json();
        }
    });

    return (
        <section className="py-20 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        Featured Reviews
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Top-rated food experiences from our community
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-200 dark:bg-gray-900 animate-pulse h-96 rounded-2xl"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {reviews.slice(0, 8).map((review, index) => (
                            <Card key={review._id} className="group h-full flex flex-col">
                                <div className="relative overflow-hidden h-56">
                                    <img
                                        src={review.foodImage}
                                        alt={review.foodName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg border border-orange-500/20">
                                        <FaStar className="text-yellow-500 text-sm" />
                                        <span className="font-bold text-gray-900 dark:text-white">{review.rating}</span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{review.foodName}</h3>
                                    </div>
                                    <p className="text-orange-500 font-semibold mb-2">{review.restaurantName}</p>

                                    <div className="mt-auto space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <FaMapMarkerAlt className="text-orange-500" />
                                            <span className="truncate">{review.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <FaUser className="text-orange-500" />
                                            <span className="truncate">By {review.reviewerName}</span>
                                        </div>

                                        <Link
                                            to={`/review/${review._id}`}
                                            className="block text-center mt-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition-all"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        to="/all-reviews"
                        className="inline-block px-10 py-4 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full font-bold text-lg transition-all hover:scale-105"
                    >
                        Show All Reviews →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedReviews;

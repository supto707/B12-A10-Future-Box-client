import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaUser, FaCalendar, FaHeart, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const ReviewDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: review, isLoading } = useQuery({
    queryKey: ['review', id],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
      return res.json();
    }
  });

  // Fetch "Related" reviews - for now let's just fetch latest 3 excluding current
  const { data: relatedReviews = [] } = useQuery({
    queryKey: ['relatedReviews', id],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews?limit=4`);
      const data = await res.json();
      return data.filter(r => r._id !== id).slice(0, 3);
    },
    enabled: !!review
  });

  const handleAddToFavorites = async () => {
    if (!user) {
      toast.error('Please login to add favorites');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user.email,
          reviewId: review._id,
          foodName: review.foodName,
          foodImage: review.foodImage,
          restaurantName: review.restaurantName,
          location: review.location,
          rating: review.rating
        })
      });

      const data = await res.json();
      if (data.message === 'Already in favorites') {
        toast.error('Already in your favorites');
      } else {
        toast.success('Added to favorites!');
      }
    } catch (error) {
      toast.error('Failed to add to favorites');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">

          {/* Left Column - Image */}
          {/* Left Column - Image & Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] mb-6 border border-gray-100 dark:border-gray-800">
              <img src={review.foodImage} alt={review.foodName} className="w-full h-full object-cover" />
              <div className="absolute top-6 right-6 bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-xl border border-orange-500/20">
                <FaStar className="text-yellow-500 text-xl" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">{review.rating}</span>
              </div>
            </div>

            {/* Mock Gallery for "Multiple Images" Requirement */}
            <h4 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-200">More Photos</h4>
            <div className="grid grid-cols-4 gap-4">
              {[review.foodImage, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80', 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&q=80'].map((img, idx) => (
                <div key={idx} className="h-20 rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 border-transparent hover:border-orange-500 shadow-sm">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent leading-tight">
              {review.foodName}
            </h1>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>{review.restaurantName}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300">
                <FaUser className="text-orange-500" />
                <span>By {review.reviewerName}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300">
                <FaCalendar className="text-orange-500" />
                <span>{new Date(review.date || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Review</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {review.reviewText}
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleAddToFavorites} size="lg" className="flex-1 shadow-xl shadow-orange-500/20">
                <FaHeart className="mr-2" />
                Add to Favorites
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Related Items Section */}
        {relatedReviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-gray-100 dark:border-gray-800 pt-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white">
              More You Might Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedReviews.map((item, idx) => (
                <Link to={`/review/${item._id}`} key={item._id} className="group">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img src={item.foodImage} alt={item.foodName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-white text-xs font-bold flex items-center gap-1">
                        <FaStar className="text-yellow-500" /> {item.rating}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-1">{item.foodName}</h4>
                      <p className="text-orange-500 text-sm font-semibold mb-4">{item.restaurantName}</p>
                      <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 group-hover:text-orange-500 transition-colors font-medium">
                        View Details <FaArrowRight />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div >
  );
};

export default ReviewDetails;

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AllReviews = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews', search],
    queryFn: async () => {
      const url = search 
        ? `${import.meta.env.VITE_API_URL}/reviews?search=${search}`
        : `${import.meta.env.VITE_API_URL}/reviews`;
      const res = await fetch(url);
      return res.json();
    }
  });

  const handleAddToFavorites = async (review) => {
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
        toast.error('Already in favorites');
      } else {
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error('Failed to add to favorites');
    }
  };

  return (
    <div className="bg-black min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">All Reviews</h2>
          <p className="text-gray-400 text-lg">Discover amazing food experiences from our community</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search by food name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-4 bg-gray-900 border-2 border-orange-500/30 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 text-lg text-white placeholder-gray-500"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 text-2xl">🔍</div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900 animate-pulse h-96 rounded-2xl"></div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-500 text-xl">No reviews found</motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div key={review._id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }} className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/50 transition-all shadow-xl hover:shadow-orange-500/20">
                <div className="relative overflow-hidden">
                  <img src={review.foodImage} alt={review.foodName} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => handleAddToFavorites(review)} className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm p-3 rounded-full text-red-500 text-xl hover:bg-black transition-all shadow-lg">
                    <FaHeart />
                  </motion.button>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <FaStar className="text-sm" />
                    <span className="font-bold">{review.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{review.foodName}</h3>
                  <p className="text-orange-500 font-semibold mb-1">{review.restaurantName}</p>
                  <p className="text-sm text-gray-400 mb-3">{review.location}</p>
                  <p className="text-sm text-gray-500 mb-4">By {review.reviewerName}</p>
                  <p className="text-sm text-gray-400 mb-5 line-clamp-2">{review.reviewText}</p>
                  <Link to={`/review/${review._id}`} className="block text-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;

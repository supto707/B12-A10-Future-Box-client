import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

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
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-8">All Reviews</h2>
      
      <div className="max-w-md mx-auto mb-8">
        <input 
          type="text"
          placeholder="Search by food name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-96 rounded-lg"></div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No reviews found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div key={review._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <img src={review.foodImage} alt={review.foodName} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{review.foodName}</h3>
                  <button onClick={() => handleAddToFavorites(review)} className="text-red-500 text-xl hover:scale-110 transition">
                    <FaHeart />
                  </button>
                </div>
                <p className="text-gray-600 mb-1">{review.restaurantName}</p>
                <p className="text-sm text-gray-500 mb-2">{review.location}</p>
                <div className="flex items-center gap-2 mb-3">
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold">{review.rating}</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">By {review.reviewerName}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{review.reviewText}</p>
                <Link to={`/review/${review._id}`} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 inline-block">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;

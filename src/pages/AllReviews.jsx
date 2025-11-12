import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import gsap from 'gsap';

const AllReviews = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });
    }
  }, []);

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

  useEffect(() => {
    if (!isLoading && reviews.length > 0) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      cardsRef.current.forEach(card => {
        if (card) {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
          });
        }
      });
    }
  }, [isLoading, reviews]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 ref={titleRef} className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">All Reviews</h2>
        <p className="text-gray-600 text-lg">Discover amazing food experiences from our community</p>
      </div>
      
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input 
            type="text"
            placeholder="Search by food name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-500 text-lg shadow-lg"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 text-2xl">🔍</div>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={review._id} ref={el => cardsRef.current[index] = el} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img src={review.foodImage} alt={review.foodName} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                <button onClick={() => handleAddToFavorites(review)} className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-full text-red-500 text-xl hover:scale-125 hover:bg-white transition-all shadow-lg">
                  <FaHeart />
                </button>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <FaStar className="text-sm" />
                  <span className="font-bold">{review.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{review.foodName}</h3>
                <p className="text-orange-600 font-semibold mb-1">{review.restaurantName}</p>
                <p className="text-sm text-gray-500 mb-3">{review.location}</p>
                <p className="text-sm text-gray-400 mb-4">By {review.reviewerName}</p>
                <p className="text-sm text-gray-600 mb-5 line-clamp-2">{review.reviewText}</p>
                <Link to={`/review/${review._id}`} className="block text-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
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

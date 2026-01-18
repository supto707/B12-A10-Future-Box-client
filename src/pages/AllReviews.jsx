import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPaginate from 'react-paginate';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const AllReviews = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [filterRestaurant, setFilterRestaurant] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`);
      return res.json();
    }
  });

  // Filter and Sort Logic
  const processedReviews = useMemo(() => {
    let result = [...reviews];

    // Search Filter
    if (search) {
      result = result.filter(review =>
        review.foodName.toLowerCase().includes(search.toLowerCase()) ||
        review.restaurantName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Restaurant Filter
    if (filterRestaurant !== 'all') {
      result = result.filter(review => review.restaurantName === filterRestaurant);
    }

    // Rating Filter
    if (filterRating !== 'all') {
      const minRating = parseInt(filterRating);
      if (filterRating === '5') {
        result = result.filter(review => review.rating === 5);
      } else {
        result = result.filter(review => review.rating >= minRating);
      }
    }

    // Sorting
    switch (sortOption) {
      case 'newest':
        // Assuming _id roughly correlates to time or we need a date field. 
        // If no date field, we can use _id reverse sort.
        // The API returns sorted by date:-1 already for /reviews usually.
        // Let's just reverse if needed or sort by string comparison if we had dates.
        // For now, let's keep array order as is for newest (default API)
        break;
      case 'oldest':
        result.reverse();
        break;
      case 'rating-high':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low':
        result.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    return result;
  }, [reviews, search, sortOption, filterRestaurant, filterRating]);

  // Pagination Logic
  const pageCount = Math.ceil(processedReviews.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentReviews = processedReviews.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <div className="min-h-screen bg-white dark:bg-black py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Discover Food
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Explore the best local flavors reviewed by our community
          </p>
        </motion.div>

        {/* Controls Section */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl mb-12 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">

            {/* Search */}
            <div className="relative w-full lg:w-1/3">
              <input
                type="text"
                placeholder="Search food or restaurants..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-700 dark:text-gray-200"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Filters & Sort */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

              {/* Filter: Restaurant */}
              <div className="relative group w-full sm:w-auto">
                <select
                  value={filterRestaurant}
                  onChange={(e) => setFilterRestaurant(e.target.value)}
                  className="appearance-none w-full sm:w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 pl-10 pr-8 rounded-xl focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="all">All Restaurants</option>
                  {[...new Set(reviews.map(r => r.restaurantName))].sort().map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Filter: Rating */}
              <div className="relative group w-full sm:w-auto">
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="appearance-none w-full sm:w-40 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 pl-10 pr-8 rounded-xl focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars Only</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
                <FaStar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Sort */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none w-full sm:w-40 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 pl-10 pr-8 rounded-xl focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating-high">Highest Rated</option>
                  <option value="rating-low">Lowest Rated</option>
                </select>
                <FaSortAmountDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-900 animate-pulse h-80 rounded-2xl"></div>
            ))}
          </div>
        ) : processedReviews.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-500 text-xl font-medium">No reviews found matching your criteria</p>
            <button
              onClick={() => { setSearch(''); setFilterRestaurant('all'); setFilterRating('all'); }}
              className="mt-4 text-orange-500 font-semibold hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
            >
              <AnimatePresence>
                {currentReviews.map((review) => (
                  <Card key={review._id} className="flex flex-col h-full group">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={review.foodImage}
                        alt={review.foodName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddToFavorites(review)}
                        className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm p-2 rounded-full text-white hover:text-red-500 hover:bg-white transition-all shadow-lg"
                      >
                        <FaHeart />
                      </motion.button>
                      <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg text-xs font-bold border border-orange-500/20">
                        <FaStar className="text-yellow-500" />
                        <span className="text-gray-900 dark:text-white">{review.rating}</span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white line-clamp-1">{review.foodName}</h3>
                      <p className="text-orange-500 text-sm font-semibold mb-2 line-clamp-1">{review.restaurantName}</p>

                      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Link
                          to={`/review/${review._id}`}
                          className="block w-full text-center bg-gray-50 dark:bg-gray-800 hover:bg-orange-500 hover:text-white text-gray-700 dark:text-gray-300 py-2 rounded-lg font-semibold text-sm transition-all"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="flex justify-center mt-12">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={pageCount}
                  previousLabel="< Prev"
                  renderOnZeroPageCount={null}
                  containerClassName="flex items-center gap-2"
                  pageClassName="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-gray-700 dark:text-gray-300"
                  activeClassName="!bg-orange-500 !text-white !border-orange-500"
                  previousClassName="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-gray-700 dark:text-gray-300"
                  nextClassName="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-gray-700 dark:text-gray-300"
                  disabledClassName="opacity-50 cursor-not-allowed hover:bg-transparent"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllReviews;

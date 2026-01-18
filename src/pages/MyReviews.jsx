import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { FaEdit, FaTrash, FaSadTear } from 'react-icons/fa';

const MyReviews = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['myReviews', user?.email],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/my-reviews/${user.email}`);
      return res.json();
    },
    enabled: !!user
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`, {
        method: 'DELETE'
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myReviews']);
      toast.success('Review deleted successfully');
      setDeleteId(null);
    }
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            My Reviews
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Manage your culinary contributions</p>
        </motion.div>

        {reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-16 rounded-3xl border border-gray-100 dark:border-gray-800 text-center"
          >
            <FaSadTear className="text-6xl text-gray-300 dark:text-gray-700 mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Reviews Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Start your journey by adding your first review!</p>
            <Link to="/dashboard/add-review">
              <Button size="lg">Add Review</Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-black border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Food</th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Restaurant</th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {reviews.map((review, idx) => (
                    <motion.tr
                      key={review._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <img src={review.foodImage} alt={review.foodName} className="w-16 h-16 object-cover rounded-xl shadow-sm" />
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">{review.foodName}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{review.restaurantName}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{new Date(review.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3 justify-center">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/edit-review/${review._id}`)} className="!p-2 text-blue-500 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            <FaEdit />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setDeleteId(review._id)} className="!p-2 text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setDeleteId(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-gray-100 dark:border-gray-800"
                onClick={e => e.stopPropagation()}
              >
                <div className="bg-red-100 dark:bg-red-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 text-2xl">
                  <FaTrash />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center text-gray-800 dark:text-white">Delete Review?</h3>
                <p className="mb-8 text-center text-gray-500 dark:text-gray-400">This action cannot be undone. Are you sure you want to proceed?</p>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
                  <Button className="bg-red-500 hover:bg-red-600 border-none" onClick={() => handleDelete(deleteId)}>Delete</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyReviews;

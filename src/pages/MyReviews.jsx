import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-12">
      <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">My Reviews</h2>
        <p className="text-gray-600 text-lg">Manage all your food reviews</p>
      </div>
      
      {reviews.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center">
          <p className="text-gray-500 text-xl">You haven't added any reviews yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-3xl shadow-2xl">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Food Image</th>
                <th className="px-6 py-4 text-left">Food Name</th>
                <th className="px-6 py-4 text-left">Restaurant</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img src={review.foodImage} alt={review.foodName} className="w-20 h-20 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 font-semibold">{review.foodName}</td>
                  <td className="px-6 py-4">{review.restaurantName}</td>
                  <td className="px-6 py-4">{new Date(review.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 justify-center">
                      <Link to={`/edit-review/${review._id}`} className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 font-semibold transition-all hover:scale-105">
                        Edit
                      </Link>
                      <button onClick={() => setDeleteId(review._id)} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 font-semibold transition-all hover:scale-105">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md border-t-4 border-red-500 animate-fade-in">
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Confirm Delete</h3>
            <p className="mb-8 text-gray-600 text-lg">Are you sure you want to delete this review? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:shadow-xl font-bold transition-all hover:scale-105">
                Confirm
              </button>
              <button onClick={() => setDeleteId(null)} className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 font-semibold transition-all hover:scale-105">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default MyReviews;

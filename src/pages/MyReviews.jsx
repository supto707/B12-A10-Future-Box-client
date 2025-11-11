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
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-8">My Reviews</h2>
      
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">You haven't added any reviews yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-orange-500 text-white">
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
                    <div className="flex gap-2 justify-center">
                      <Link to={`/edit-review/${review._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Edit
                      </Link>
                      <button onClick={() => setDeleteId(review._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
            <h3 className="text-2xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this review?</p>
            <div className="flex gap-4">
              <button onClick={() => handleDelete(deleteId)} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                Confirm
              </button>
              <button onClick={() => setDeleteId(null)} className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;

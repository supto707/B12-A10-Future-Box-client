import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { FaStar, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const MyFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites', user?.email],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favorites/${user.email}`);
      return res.json();
    },
    enabled: !!user
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favorites/${id}`, {
        method: 'DELETE'
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites']);
      toast.success('Removed from favorites');
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-8">My Favorites</h2>
      
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No favorites yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map(fav => (
            <div key={fav._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <img src={fav.foodImage} alt={fav.foodName} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{fav.foodName}</h3>
                <p className="text-gray-600 mb-1">{fav.restaurantName}</p>
                <p className="text-sm text-gray-500 mb-2">{fav.location}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span className="font-semibold">{fav.rating}</span>
                  </div>
                  <button 
                    onClick={() => deleteMutation.mutate(fav._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites;

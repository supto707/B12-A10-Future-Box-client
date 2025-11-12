import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { FaStar, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MyFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        x: -100,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }, []);

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

  useEffect(() => {
    if (!isLoading && favorites.length > 0) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        rotateY: 90,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }, [isLoading, favorites]);

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
        <h2 ref={titleRef} className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">My Favorites</h2>
        <p className="text-gray-600 text-lg">Your saved food experiences</p>
      </div>
      
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No favorites yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {favorites.map((fav, index) => (
            <div key={fav._id} ref={el => cardsRef.current[index] = el} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img src={fav.foodImage} alt={fav.foodName} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <FaStar className="text-sm" />
                  <span className="font-bold">{fav.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{fav.foodName}</h3>
                <p className="text-orange-600 font-semibold mb-1">{fav.restaurantName}</p>
                <p className="text-sm text-gray-500 mb-4">{fav.location}</p>
                <button 
                  onClick={() => deleteMutation.mutate(fav._id)}
                  className="w-full bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <FaTrash /> Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default MyFavorites;

import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { data: review, isLoading } = useQuery({
    queryKey: ['review', id],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
      return res.json();
    }
  });

  useEffect(() => {
    if (review) {
      reset(review);
    }
  }, [review, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, rating: parseFloat(data.rating) })
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success('Review updated successfully');
      navigate('/my-reviews');
    }
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
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
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Edit Review</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Food Name</label>
            <input 
              {...register('foodName', { required: 'Food name is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.foodName && <p className="text-red-500 text-sm mt-1">{errors.foodName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Food Image URL</label>
            <input 
              {...register('foodImage', { required: 'Food image URL is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.foodImage && <p className="text-red-500 text-sm mt-1">{errors.foodImage.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Restaurant Name</label>
            <input 
              {...register('restaurantName', { required: 'Restaurant name is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.restaurantName && <p className="text-red-500 text-sm mt-1">{errors.restaurantName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Location</label>
            <input 
              {...register('location', { required: 'Location is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Star Rating (1-5)</label>
            <input 
              type="number"
              step="0.1"
              {...register('rating', { 
                required: 'Rating is required',
                min: { value: 1, message: 'Minimum rating is 1' },
                max: { value: 5, message: 'Maximum rating is 5' }
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Review Text</label>
            <textarea 
              {...register('reviewText', { required: 'Review text is required' })}
              rows="5"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.reviewText && <p className="text-red-500 text-sm mt-1">{errors.reviewText.message}</p>}
          </div>

          <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold">
            Update Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditReview;

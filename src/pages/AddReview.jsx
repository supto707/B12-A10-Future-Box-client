import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddReview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const review = {
      ...data,
      rating: parseFloat(data.rating),
      userEmail: user.email,
      reviewerName: user.displayName,
      date: new Date().toISOString()
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });
      
      if (res.ok) {
        toast.success('Review added successfully');
        navigate('/my-reviews');
      }
    } catch (error) {
      toast.error('Failed to add review');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Add Review</h2>
        
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
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;

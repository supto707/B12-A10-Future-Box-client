import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

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
      userPhoto: user.photoURL,
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
      } else {
        toast.error('Failed to add review');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Share Your Experience
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Food Name"
                placeholder="e.g. Spicy Ramen"
                {...register('foodName', { required: 'Food name is required' })}
                error={errors.foodName?.message}
              />
              <Input
                label="Restaurant Name"
                placeholder="e.g. Oodles of Noodles"
                {...register('restaurantName', { required: 'Restaurant name is required' })}
                error={errors.restaurantName?.message}
              />
            </div>

            <Input
              label="Food Image URL"
              placeholder="https://example.com/image.jpg"
              {...register('foodImage', { required: 'Food image URL is required' })}
              error={errors.foodImage?.message}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Location"
                placeholder="e.g. New York, NY"
                {...register('location', { required: 'Location is required' })}
                error={errors.location?.message}
              />
              <Input
                label="Rating (1-5)"
                type="number"
                step="0.1"
                placeholder="5.0"
                {...register('rating', {
                  required: 'Rating is required',
                  min: { value: 1, message: 'Minimum 1' },
                  max: { value: 5, message: 'Maximum 5' }
                })}
                error={errors.rating?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Review Details
              </label>
              <textarea
                {...register('reviewText', { required: 'Review text is required' })}
                rows="5"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-800 dark:text-white placeholder-gray-400"
                placeholder="Tell us about the taste, texture, and service..."
              />
              {errors.reviewText && <p className="text-red-500 text-xs mt-1 font-medium">{errors.reviewText.message}</p>}
            </div>

            <Button type="submit" fullWidth size="lg" className="mt-4 shadow-xl shadow-orange-500/20">
              Submit Review
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddReview;

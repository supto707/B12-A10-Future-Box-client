import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaUser, FaCalendar } from 'react-icons/fa';

const ReviewDetails = () => {
  const { id } = useParams();

  const { data: review, isLoading } = useQuery({
    queryKey: ['review', id],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
      return res.json();
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
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={review.foodImage} alt={review.foodName} className="w-full h-96 object-cover" />
        
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{review.foodName}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <FaStar className="text-yellow-500 text-2xl" />
            <span className="text-2xl font-semibold">{review.rating}</span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-orange-500" />
              <span className="font-semibold">{review.restaurantName}</span>
              <span>- {review.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <FaUser className="text-orange-500" />
              <span>Reviewed by {review.reviewerName}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <FaCalendar className="text-orange-500" />
              <span>{new Date(review.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-2xl font-bold mb-4">Review</h3>
            <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;

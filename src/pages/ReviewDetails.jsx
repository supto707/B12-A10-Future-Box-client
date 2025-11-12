import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaUser, FaCalendar } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ReviewDetails = () => {
  const { id } = useParams();
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const detailsRef = useRef(null);
  const reviewRef = useRef(null);

  const { data: review, isLoading } = useQuery({
    queryKey: ['review', id],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
      return res.json();
    }
  });

  useEffect(() => {
    if (review && imageRef.current) {
      gsap.from(imageRef.current, { opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out' });
      gsap.from(titleRef.current, { opacity: 0, x: -50, duration: 0.8, delay: 0.2, ease: 'power3.out' });
      gsap.from(detailsRef.current.children, { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, delay: 0.4, ease: 'power2.out' });
      gsap.from(reviewRef.current, { opacity: 0, y: 50, duration: 0.8, delay: 0.6, ease: 'power3.out' });
    }
  }, [review]);

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
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-t-4 border-orange-500">
        <div className="relative">
          <img ref={imageRef} src={review.foodImage} alt={review.foodName} className="w-full h-[500px] object-cover" />
          <div className="absolute top-6 right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-2xl">
            <FaStar className="text-2xl" />
            <span className="text-2xl font-bold">{review.rating}</span>
          </div>
        </div>
        
        <div className="p-10">
          <h1 ref={titleRef} className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{review.foodName}</h1>

          <div ref={detailsRef} className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
              <FaMapMarkerAlt className="text-orange-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-bold text-gray-800">{review.restaurantName}</p>
                <p className="text-sm text-gray-600">{review.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
              <FaUser className="text-orange-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Reviewed by</p>
                <p className="font-bold text-gray-800">{review.reviewerName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
              <FaCalendar className="text-orange-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-bold text-gray-800">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div ref={reviewRef} className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-2xl">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Review</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{review.reviewText}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ReviewDetails;

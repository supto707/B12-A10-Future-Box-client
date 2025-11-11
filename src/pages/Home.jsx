import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';

const Home = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['featuredReviews'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/featured`);
      return res.json();
    }
  });

  const banners = [
    { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200', title: 'Discover Local Flavors', desc: 'Share your food journey with fellow enthusiasts' },
    { img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200', title: 'Rate & Review', desc: 'Help others find the best local eats' },
    { img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200', title: 'Connect with Foodies', desc: 'Join a community of passionate food lovers' }
  ];

  return (
    <div>
      <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3000 }} pagination={{ clickable: true }} className="h-[500px]">
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-full">
              <img src={banner.img} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                <h1 className="text-5xl font-bold mb-4">{banner.title}</h1>
                <p className="text-xl mb-6">{banner.desc}</p>
                <Link to="/all-reviews" className="bg-orange-500 px-8 py-3 rounded-lg text-lg hover:bg-orange-600">Explore Reviews</Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Reviews</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-80 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(review => (
              <div key={review._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <img src={review.foodImage} alt={review.foodName} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{review.foodName}</h3>
                  <p className="text-gray-600 mb-1">{review.restaurantName}</p>
                  <p className="text-sm text-gray-500 mb-2">{review.location}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <FaStar className="text-yellow-500" />
                    <span className="font-semibold">{review.rating}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">By {review.reviewerName}</p>
                  <Link to={`/review/${review._id}`} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 inline-block">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link to="/all-reviews" className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 inline-block">Show All</Link>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">🍕</div>
              <h3 className="text-2xl font-bold mb-3">Discover Hidden Gems</h3>
              <p className="text-gray-600">Find amazing local restaurants and street food spots recommended by real food lovers.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold mb-3">Share Your Experience</h3>
              <p className="text-gray-600">Write reviews, upload photos, and help others make better food choices.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-3">Connect with Foodies</h3>
              <p className="text-gray-600">Join a vibrant community of food enthusiasts who share your passion.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Popular Cuisines</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Italian', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },
            { name: 'Asian', img: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400' },
            { name: 'Mexican', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400' },
            { name: 'American', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' }
          ].map((cuisine, idx) => (
            <div key={idx} className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <img src={cuisine.img} alt={cuisine.name} className="w-full h-full object-cover group-hover:scale-110 transition" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{cuisine.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

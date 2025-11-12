import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Home = () => {
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['featuredReviews'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/featured`);
      return res.json();
    }
  });

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out'
      });
    }
    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });
    }
  }, []);

  useEffect(() => {
    if (!isLoading && reviews.length > 0) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }, [isLoading, reviews]);

  const banners = [
    { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80', title: 'Discover Local Flavors', desc: 'Share your food journey with fellow enthusiasts' },
    { img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80', title: 'Rate & Review', desc: 'Help others find the best local eats' },
    { img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80', title: 'Connect with Foodies', desc: 'Join a community of passionate food lovers' }
  ];

  return (
    <div>
      <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4000 }} pagination={{ clickable: true }} className="h-[600px]">
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-full">
              <img src={banner.img} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-center items-center text-white px-4">
                <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">{banner.title}</h1>
                <p className="text-2xl mb-8 text-gray-200">{banner.desc}</p>
                <Link to="/all-reviews" className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <span className="relative z-10">Explore Reviews</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Featured Reviews</h2>
          <p ref={subtitleRef} className="text-gray-600 text-lg">Top-rated food experiences from our community</p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-80 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={review._id} ref={el => cardsRef.current[index] = el} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img src={review.foodImage} alt={review.foodName} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <FaStar className="text-sm" />
                    <span className="font-bold">{review.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{review.foodName}</h3>
                  <p className="text-orange-600 font-semibold mb-1">{review.restaurantName}</p>
                  <p className="text-sm text-gray-500 mb-4">{review.location}</p>
                  <p className="text-sm text-gray-400 mb-4">By {review.reviewerName}</p>
                  <Link to={`/review/${review._id}`} className="block text-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link to="/all-reviews" className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            Show All Reviews →
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Why Join Us?</h2>
            <p className="text-gray-600 text-lg">Be part of the ultimate food community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-10 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-t-4 border-orange-500">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">🍕</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Discover Hidden Gems</h3>
              <p className="text-gray-600 leading-relaxed">Find amazing local restaurants and street food spots recommended by real food lovers.</p>
            </div>
            <div className="group bg-white p-10 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-t-4 border-red-500">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">⭐</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Share Your Experience</h3>
              <p className="text-gray-600 leading-relaxed">Write reviews, upload photos, and help others make better food choices.</p>
            </div>
            <div className="group bg-white p-10 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-t-4 border-yellow-500">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">👥</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Connect with Foodies</h3>
              <p className="text-gray-600 leading-relaxed">Join a vibrant community of food enthusiasts who share your passion.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Popular Cuisines</h2>
          <p className="text-gray-600 text-lg">Explore diverse flavors from around the world</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Italian', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80' },
            { name: 'Asian', img: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&q=80' },
            { name: 'Mexican', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80' },
            { name: 'American', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80' }
          ].map((cuisine, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
              <img src={cuisine.img} alt={cuisine.name} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold group-hover:scale-110 transition-transform">{cuisine.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

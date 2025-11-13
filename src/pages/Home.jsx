import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Home = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['featuredReviews'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/featured`);
      return res.json();
    }
  });

  const banners = [
    { img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80', title: 'Discover Local Flavors', desc: 'Share your food journey with fellow enthusiasts' },
    { img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80', title: 'Rate & Review', desc: 'Help others find the best local eats' },
    { img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80', title: 'Connect with Foodies', desc: 'Join a community of passionate food lovers' }
  ];

  return (
    <div className="bg-black min-h-screen">
      <Swiper modules={[Autoplay, Pagination, EffectFade]} autoplay={{ delay: 4000 }} pagination={{ clickable: true }} effect="fade" className="h-[600px]">
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-full">
              <img src={banner.img} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-center items-center text-white px-4">
                <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-6xl md:text-7xl font-bold mb-6">{banner.title}</motion.h1>
                <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-2xl mb-8 text-gray-200">{banner.desc}</motion.p>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
                  <Link to="/all-reviews" className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all hover:scale-105">
                    Explore Reviews
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Featured Reviews</h2>
          <p className="text-gray-400 text-lg">Top-rated food experiences from our community</p>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-900 animate-pulse h-96 rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div key={review._id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }} className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/50 transition-all shadow-xl hover:shadow-orange-500/20">
                <div className="relative overflow-hidden">
                  <img src={review.foodImage} alt={review.foodName} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <FaStar className="text-sm" />
                    <span className="font-bold">{review.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{review.foodName}</h3>
                  <p className="text-orange-500 font-semibold mb-1">{review.restaurantName}</p>
                  <p className="text-sm text-gray-400 mb-4">{review.location}</p>
                  <p className="text-sm text-gray-500 mb-4">By {review.reviewerName}</p>
                  <Link to={`/review/${review._id}`} className="block text-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <Link to="/all-reviews" className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105">
            Show All Reviews →
          </Link>
        </motion.div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black py-20 border-y border-orange-500/20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Why Join Us?</h2>
            <p className="text-gray-400 text-lg">Be part of the ultimate food community</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🍕', title: 'Discover Hidden Gems', desc: 'Find amazing local restaurants and street food spots recommended by real food lovers.' },
              { icon: '⭐', title: 'Share Your Experience', desc: 'Write reviews, upload photos, and help others make better food choices.' },
              { icon: '👥', title: 'Connect with Foodies', desc: 'Join a vibrant community of food enthusiasts who share your passion.' }
            ].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }} whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-3xl text-center border border-orange-500/20 hover:border-orange-500/50 transition-all">
                <div className="text-7xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Popular Cuisines</h2>
          <p className="text-gray-400 text-lg">Explore diverse flavors from around the world</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Italian', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80' },
            { name: 'Asian', img: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&q=80' },
            { name: 'Mexican', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80' },
            { name: 'American', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80' }
          ].map((cuisine, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ scale: 1.05 }} className="relative rounded-2xl overflow-hidden h-64 cursor-pointer border border-orange-500/20 hover:border-orange-500/50 transition-all">
              <img src={cuisine.img} alt={cuisine.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold">{cuisine.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

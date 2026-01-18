import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { motion } from 'framer-motion';

const Hero = () => {
    const banners = [
        {
            img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
            title: 'Discover Local Flavors',
            desc: 'Share your food journey with fellow enthusiasts'
        },
        {
            img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80',
            title: 'Rate & Review',
            desc: 'Help others find the best local eats'
        },
        {
            img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80',
            title: 'Connect with Foodies',
            desc: 'Join a community of passionate food lovers'
        },
        {
            img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
            title: 'Hidden Gems',
            desc: 'Uncover the best kept secrets in your city'
        }
    ];

    return (
        <section className="relative group">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                effect="fade"
                className="h-[65vh] md:h-[75vh] min-h-[500px]"
            >
                {banners.map((banner, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative h-full">
                            <img src={banner.img} alt={banner.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 flex flex-col justify-center items-center text-white px-4 text-center">
                                <motion.h1
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl font-heading"
                                >
                                    {banner.title}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg max-w-2xl font-medium"
                                >
                                    {banner.desc}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <Link
                                        to="/all-reviews"
                                        className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-lg font-bold text-white hover:shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                    >
                                        Explore Reviews
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            >
                <span className="text-sm uppercase tracking-widest font-bold text-white/80">Scroll</span>
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1 backdrop-blur-sm">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;

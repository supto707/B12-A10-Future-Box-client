import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Food Blogger',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
            text: 'This platform has completely changed how I discover new restaurants. The community here is amazing!',
            rating: 5
        },
        {
            name: 'Michael Chen',
            role: 'Chef',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
            text: 'As a chef, I love seeing honest feedback from real food lovers. It helps us improve and connect with our customers.',
            rating: 5
        },
        {
            name: 'Emily Davis',
            role: 'Foodie',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
            text: 'I found my favorite pizza place thanks to a recommendation here. Highly recommended app!',
            rating: 4
        }
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        What Foodies Say
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Hear from our community of passionate food lovers
                    </p>
                </motion.div>

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    className="pb-16"
                >
                    {testimonials.map((item, idx) => (
                        <SwiperSlide key={idx} className="pb-10">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-orange-500/20 h-full flex flex-col relative group hover:border-orange-500/50 transition-all duration-300">
                                <FaQuoteLeft className="text-4xl text-orange-500/20 mb-6 group-hover:text-orange-500/40 transition-colors" />
                                <p className="text-gray-600 dark:text-gray-300 mb-8 flex-grow italic leading-relaxed">"{item.text}"</p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full object-cover border-2 border-orange-500" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">{item.name}</h4>
                                        <p className="text-sm text-orange-500">{item.role}</p>
                                    </div>
                                    <div className="ml-auto flex gap-1 text-yellow-400">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <FaStar key={i} size={14} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;

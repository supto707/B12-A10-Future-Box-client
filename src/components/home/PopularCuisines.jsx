import { motion } from 'framer-motion';

const PopularCuisines = () => {
    const cuisines = [
        { name: 'Italian', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80' },
        { name: 'Asian', img: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&q=80' },
        { name: 'Mexican', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80' },
        { name: 'American', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80' },
        { name: 'Desserts', img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80' },
        { name: 'Healthy', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80' }
    ];

    return (
        <section className="py-20 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        Popular Cuisines
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Explore diverse flavors from around the world
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {cuisines.map((cuisine, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative rounded-2xl overflow-hidden h-64 cursor-pointer group shadow-lg"
                        >
                            <img
                                src={cuisine.img}
                                alt={cuisine.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end justify-center pb-6 md:pb-8 group-hover:bg-black/50 transition-colors">
                                <h3 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg transform group-hover:-translate-y-2 transition-transform">
                                    {cuisine.name}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCuisines;

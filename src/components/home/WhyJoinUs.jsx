import { motion } from 'framer-motion';

const WhyJoinUs = () => {
    const benefits = [
        {
            icon: '🍕',
            title: 'Discover Hidden Gems',
            desc: 'Find amazing local restaurants and street food spots recommended by real food lovers.'
        },
        {
            icon: '⭐',
            title: 'Share Your Experience',
            desc: 'Write reviews, upload photos, and help others make better food choices.'
        },
        {
            icon: '👥',
            title: 'Connect with Foodies',
            desc: 'Join a vibrant community of food enthusiasts who share your passion.'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        Why Join Us?
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Be part of the ultimate food community
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 backdrop-blur-md p-10 rounded-3xl text-center border border-white/10 hover:border-orange-500/50 transition-all hover:bg-white/10"
                        >
                            <div className="text-7xl mb-6 drop-shadow-lg">{item.icon}</div>
                            <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyJoinUs;

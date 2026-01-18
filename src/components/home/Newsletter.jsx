import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Newsletter = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80"
                    alt="Food background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Stay in the <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Flavor Loop</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                            Subscribe to our newsletter to get the latest food reviews, hidden gems, and exclusive community events delivered straight to your inbox.
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-grow px-6 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                            required
                        />
                        <Button size="lg" className="rounded-xl shadow-xl">
                            Subscribe Now
                        </Button>
                    </motion.form>

                    <p className="mt-6 text-sm text-gray-500">
                        We promise not to spam. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;

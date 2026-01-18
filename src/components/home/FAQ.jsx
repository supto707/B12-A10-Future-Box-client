import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: 'How do I start writing reviews?',
            answer: 'Simply create an account, log in, and click on the "Add Review" button in the navigation bar. You can share your experience, upload photos, and rate the food.'
        },
        {
            question: 'Is it free to join?',
            answer: 'Yes! Joining "Local Food Lovers Network" is completely free. You can browse, review, and connect with other foodies without any cost.'
        },
        {
            question: 'Can I edit my reviews later?',
            answer: 'Absolutely. You can manage all your reviews from your personal dashboard or "My Reviews" page. You can update the text, rating, or images at any time.'
        },
        {
            question: 'How are top reviewers selected?',
            answer: 'Top reviewers are selected based on the quality and quantity of their contributions. Consistent, helpful, and detailed reviews help you climb the leaderboard.'
        }
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Everything you need to know about our community
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-black rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                            >
                                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{faq.question}</span>
                                <div className={`p-2 rounded-full transition-colors ${activeIndex === idx ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                                    {activeIndex === idx ? <FaMinus /> : <FaPlus />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {activeIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;

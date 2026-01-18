import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Contact = () => {
    return (
        <div className="bg-white dark:bg-black min-h-screen transition-colors duration-300 py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        Get in Touch
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Have a question or feedback? We'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 h-full"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Contact Information</h3>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-orange-500/10 p-3 rounded-xl text-orange-500 text-xl">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-white">Email</h4>
                                    <p className="text-gray-600 dark:text-gray-400">support@foodlovers.com</p>
                                    <p className="text-gray-600 dark:text-gray-400">partners@foodlovers.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-orange-500/10 p-3 rounded-xl text-orange-500 text-xl">
                                    <FaPhone />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-white">Phone</h4>
                                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                                    <p className="text-gray-600 dark:text-gray-400">Mon-Fri, 9am-6pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-orange-500/10 p-3 rounded-xl text-orange-500 text-xl">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-white">Headquarters</h4>
                                    <p className="text-gray-600 dark:text-gray-400">123 Culinary Ave,</p>
                                    <p className="text-gray-600 dark:text-gray-400">Foodie City, FC 90210</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Send Message</h3>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input label="Name" placeholder="John Doe" />
                                <Input label="Email" type="email" placeholder="you@example.com" />
                            </div>
                            <Input label="Subject" placeholder="How can we help?" />

                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">Message</label>
                                <textarea
                                    rows="4"
                                    className="w-full px-5 py-3 rounded-xl bg-gray-900 border-2 border-orange-500/20 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-all"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <Button type="submit" fullWidth className="flex items-center justify-center gap-2">
                                <FaPaperPlane /> Send Message
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

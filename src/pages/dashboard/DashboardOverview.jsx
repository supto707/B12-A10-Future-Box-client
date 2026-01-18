import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { FaStar, FaUtensils, FaCommentAlt, FaUsers } from 'react-icons/fa';

const DashboardOverview = () => {
    const { user } = useAuth();

    // Fetch user specific data
    // Note: Since we don't have dedicated stats endpoints for "my reviews vs all", 
    // we'll fetch all reviews and filter client side for purely demo purposes or use what we have.
    // Ideally, valid backend endpoints /stats would exist.
    // We'll mock the data transformation from the /reviews endpoint for now.

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`);
            return res.json();
        }
    });

    const myReviews = reviews.filter(r => r.userEmail === user?.email);
    const totalReviews = myReviews.length;
    const totalFavorites = 12; // Mock data since we don't have explicit count endpoint readily available without extra calls
    const avgRating = totalReviews > 0
        ? (myReviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
        : 0;

    // Chart Data Preparation
    const ratingsData = [
        { name: '5 Stars', count: myReviews.filter(r => r.rating === 5).length },
        { name: '4 Stars', count: myReviews.filter(r => r.rating === 4).length },
        { name: '3 Stars', count: myReviews.filter(r => r.rating === 3).length },
        { name: '2 Stars', count: myReviews.filter(r => r.rating === 2).length },
        { name: '1 Star', count: myReviews.filter(r => r.rating === 1).length },
    ];

    const activityData = [
        { name: 'Jan', reviews: 4 },
        { name: 'Feb', reviews: 3 },
        { name: 'Mar', reviews: 2 },
        { name: 'Apr', reviews: 6 },
        { name: 'May', reviews: 8 },
        { name: 'Jun', reviews: totalReviews }, // Just a visual mock trend
    ];

    const COLORS = ['#F97316', '#EF4444', '#F59E0B', '#10B981', '#6366F1'];

    const stats = [
        { label: 'Total Reviews', value: totalReviews, icon: <FaCommentAlt />, color: 'bg-blue-500' },
        { label: 'Average Rating', value: avgRating, icon: <FaStar />, color: 'bg-yellow-500' },
        { label: 'Favorites Received', value: totalFavorites, icon: <FaUtensils />, color: 'bg-green-500' },
        { label: 'Profile Views', value: '1.2k', icon: <FaUsers />, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    Dashboard Overview
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Welcome back, {user?.displayName}! Here's what's happening via your food journey.
                </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4"
                    >
                        <div className={`p-4 rounded-xl text-white ${stat.color} shadow-lg shadow-gray-200 dark:shadow-none`}>
                            <span className="text-xl">{stat.icon}</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Bar Chart - Ratings Distribution */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
                >
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Ratings Distribution</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ratingsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', color: '#fff', border: 'none', borderRadius: '8px' }}
                                />
                                <Bar dataKey="count" fill="#F97316" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Pie Chart - Interaction Mock */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
                >
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Activity Breakdown</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={ratingsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="count"
                                >
                                    {ratingsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Line Chart - Activity Trend */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 lg:col-span-2"
                >
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Review Activity Trend</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', color: '#fff', border: 'none', borderRadius: '8px' }}
                                />
                                <Line type="monotone" dataKey="reviews" stroke="#EF4444" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default DashboardOverview;

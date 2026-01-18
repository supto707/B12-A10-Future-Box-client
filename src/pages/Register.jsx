import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaCamera } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Register = () => {
  const { register: registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password');

  const handleRegister = async (data) => {
    setIsLoading(true);
    try {
      await registerUser(data.email, data.password, data.name, data.photoURL);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success('Logged in with Google');
      navigate('/');
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4 transition-colors duration-300">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">

        {/* Left Side - Image/Animation */}
        <div className="hidden md:block h-full relative order-2 md:order-1">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
            alt="Food"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-orange-500/80 to-red-500/80 flex flex-col items-center justify-center text-white p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Join the Community</h2>
            <p className="text-lg opacity-90 mb-8">
              Create an account to start reviewing, sharing, and connecting with other food lovers.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                Create Account
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Join us today! It takes less than a minute.
              </p>
            </div>

            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
              <Input
                label="Full Name"
                id="name"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />

              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />

              <Input
                label="Photo URL"
                id="photoURL"
                placeholder="https://example.com/photo.jpg"
                error={errors.photoURL?.message}
                {...register('photoURL', { required: 'Photo URL is required' })}
              />

              <Input
                label="Password"
                id="password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: "Must contain uppercase, lowercase"
                  }
                })}
              />

              <Button type="submit" fullWidth isLoading={isLoading}>
                Register
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or register with</span>
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={handleGoogleLogin}
              className="flex items-center gap-2"
              fullWidth
            >
              <FaGoogle className="text-red-500" /> Google
            </Button>

            <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-500 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;

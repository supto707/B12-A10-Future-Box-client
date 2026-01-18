import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaEnvelope, FaLock, FaUserSecret } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login = () => {
  const { login, googleLogin, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [isLoading, setIsLoading] = useState(false);

  // Demo User Credentials
  const demoCredentials = {
    email: 'demo@foodlovers.com',
    password: 'password123'
  };

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success('Logged in with Google');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  // Enhanced Demo Login Handler
  const handleDemoLogin = async () => {
    setIsLoading(true);
    setValue('email', demoCredentials.email);
    setValue('password', demoCredentials.password);

    try {
      console.log("Attempting Demo Login...");
      // 1. Try to login
      await login(demoCredentials.email, demoCredentials.password);
      toast.success('Welcome back, Demo User!');
      navigate(from, { replace: true });
    } catch (error) {
      console.log("Demo login failed, checking if registration needed. Error code:", error.code);

      // 2. If user not found (or invalid credential), try to register
      const retryCodes = ['auth/user-not-found', 'auth/invalid-credential', 'auth/wrong-password', 'auth/invalid-login-credentials'];

      const shouldRetry = retryCodes.includes(error.code) || !error.code;
      console.log("Debug: Error Code:", error.code);
      console.log("Debug: Retry Codes:", retryCodes);
      console.log("Debug: Should Retry?", shouldRetry);
      console.log("Debug: Register fn exists?", !!registerUser);

      if (shouldRetry) { // Fallback if no code
        try {
          console.log("Auto-registering Demo User...");
          const toastId = toast.loading('Creating demo user...', { id: 'demo-creation' });

          if (!registerUser) {
            throw new Error("Register function missing context");
          }

          // Auto-register
          await registerUser(demoCredentials.email, demoCredentials.password, 'Demo User', 'https://ui-avatars.com/api/?name=Demo+User');

          console.log("Demo Registration Success");
          toast.success('Demo account created! Logging in...', { id: toastId });
          navigate(from, { replace: true });
        } catch (regError) {
          console.error("Demo registration error:", regError);
          if (regError.code === 'auth/email-already-in-use') {
            toast.error('Demo account exists but access failed.');
          } else {
            toast.error('Failed to auto-create demo user: ' + regError.message);
          }
        }
      } else {
        toast.error('Login failed: ' + (error.code || error.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoUser = () => handleDemoLogin(); // Alias for button compatibility

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4 transition-colors duration-300">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">

        {/* Left Side - Image/Animation */}
        <div className="hidden md:block h-full relative">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80"
            alt="Food"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 to-red-500/80 flex flex-col items-center justify-center text-white p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>
            <p className="text-lg opacity-90 mb-8">
              Sign in to continue your food journey, share reviews, and discover new flavors.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                Login
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your details to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email', { required: 'Email is required' })}
              />

              <Input
                label="Password"
                id="password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password', { required: 'Password is required' })}
              />

              <div className="text-right">
                <Link to="/forgot-password" className="text-orange-500 hover:text-red-500 text-sm font-medium">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" fullWidth isLoading={isLoading}>
                Sign In
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="secondary"
                onClick={handleGoogleLogin}
                className="flex items-center gap-2"
                fullWidth
              >
                <FaGoogle className="text-red-500" /> Google
              </Button>

              <Button
                variant="outline"
                onClick={fillDemoUser}
                className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400"
                fullWidth
              >
                <FaUserSecret /> Demo User
              </Button>
            </div>

            <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-500 font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    }
  }, []);

  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Logged in successfully');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success('Logged in successfully');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-12 px-4">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 bg-white p-8 w-full max-w-md rounded-2xl shadow-2xl">
        <div className="flex flex-col">
          <label className="text-gray-800 font-semibold">Email</label>
        </div>
        <div className="border-2 border-gray-200 rounded-xl h-12 flex items-center px-3 focus-within:border-orange-500 transition">
          <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg"><g><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" /></g></svg>
          <input type="email" {...register('email', { required: 'Email is required' })} className="ml-3 rounded-xl border-none w-full h-full focus:outline-none" placeholder="Enter your Email" />
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        
        <div className="flex flex-col">
          <label className="text-gray-800 font-semibold">Password</label>
        </div>
        <div className="border-2 border-gray-200 rounded-xl h-12 flex items-center px-3 focus-within:border-orange-500 transition">
          <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" /><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" /></svg>
          <input type="password" {...register('password', { required: 'Password is required' })} className="ml-3 rounded-xl border-none w-full h-full focus:outline-none" placeholder="Enter your Password" />
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        
        <button type="submit" className="mt-5 bg-gray-800 text-white text-base font-medium rounded-xl h-12 w-full hover:bg-gray-700 transition">
          Sign In
        </button>
        
        <p className="text-center text-gray-800 text-sm mt-2">
          Don't have an account? <Link to="/register" className="text-orange-500 font-medium cursor-pointer">Sign Up</Link>
        </p>
        
        <p className="text-center text-gray-800 text-sm my-2">Or With</p>
        
        <button type="button" onClick={handleGoogleLogin} className="w-full h-12 rounded-xl flex justify-center items-center font-medium gap-3 border border-gray-200 bg-white hover:border-orange-500 transition">
          <FaGoogle className="text-xl" style={{ color: '#DB4437' }} /> Google
        </button>
      </form>
    </div>
  );
};

export default Login;

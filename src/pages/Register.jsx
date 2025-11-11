import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
  const { register: registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { name, email, photoURL, password } = data;
    
    try {
      await registerUser(email, password, name, photoURL);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input 
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input 
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Photo URL</label>
            <input 
              {...register('photoURL', { required: 'Photo URL is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.photoURL && <p className="text-red-500 text-sm mt-1">{errors.photoURL.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input 
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])/,
                  message: 'Password must include uppercase and lowercase letters'
                }
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
            <input 
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: value => value === watch('password') || 'Passwords do not match'
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 font-semibold">
            Register
          </button>
        </form>

        <div className="mt-4">
          <button onClick={handleGoogleLogin} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold flex items-center justify-center gap-2">
            <FaGoogle /> Continue with Google
          </button>
        </div>

        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-orange-500 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

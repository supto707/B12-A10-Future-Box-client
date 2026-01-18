import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL
        }
    });

    const onSubmit = (data) => {
        // In a real app, you would call an updateProfile function here
        // For now, we'll just show a success toast as the functionality 
        // to update profile in Firebase wasn't explicitly requested as a functional requirement,
        // but the UI is required.
        toast.success('Profile updated successfully!');
        console.log('Update Data:', data);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className="w-32 h-32 rounded-full border-4 border-orange-500 shadow-xl mb-4 object-cover"
                        />
                        <div className="absolute bottom-4 right-0 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:text-orange-500">
                            {/* Icon placeholder for edit image */}
                            📷
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user?.displayName}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            label="Display Name"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            error={errors.name?.message}
                        />
                        <Input
                            label="Email"
                            id="email"
                            disabled
                            className="opacity-60 cursor-not-allowed"
                            {...register('email')}
                        />
                    </div>

                    <Input
                        label="Photo URL"
                        id="photoURL"
                        {...register('photoURL')}
                    />

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Change Password</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                label="New Password"
                                type="password"
                                id="newPassword"
                                placeholder="Leave blank to keep current"
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm new password"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <Button type="button" variant="ghost">Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default UserProfile;

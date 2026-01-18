import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllReviews from './pages/AllReviews';
import ReviewDetails from './pages/ReviewDetails';
import AddReview from './pages/AddReview';
import MyReviews from './pages/MyReviews';
import MyFavorites from './pages/MyFavorites';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import UserProfile from './pages/dashboard/UserProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import PrivateRoute from './routes/PrivateRoute';

const queryClient = new QueryClient();

// Initial Layout Component needed if not already present
// Wait, Previous App.jsx didn't use layouts, it just had Routes?
// I viewed App.jsx earlier (Step 19) and it had Routes directly.
// I should create a MainLayout for the public pages to wrap Navbar and Footer.
// For now, I'll inline the MainLayout logic in App.jsx or create it.
// Let's create a MainLayout component to be safe and clean.

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Navbar/Footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/all-reviews" element={<AllReviews />} />
              <Route path="/review/:id" element={<ReviewDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Legacy Protected Routes - Keeping them here or moving to dashboard?
                  The requirements say "Move MyReviews into the dashboard context".
                  So I'll route them under dashboard too, or keep them check logic.
                  For now, I'll keep the existing flow valid BUT adding Dashboard routes.
              */}
              <Route path="/my-favorites" element={<PrivateRoute><MyFavorites /></PrivateRoute>} />
              <Route path="/add-review" element={<Navigate to="/dashboard/add-review" replace />} />
              <Route path="/my-reviews" element={<Navigate to="/dashboard/my-reviews" replace />} />
            </Route>

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
              <Route index element={<DashboardOverview />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="add-review" element={<AddReview />} />
              <Route path="my-reviews" element={<MyReviews />} />
            </Route>

          </Routes>
          <Toaster position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

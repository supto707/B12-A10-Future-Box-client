import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddReview from './pages/AddReview';
import AllReviews from './pages/AllReviews';
import MyReviews from './pages/MyReviews';
import EditReview from './pages/EditReview';
import ReviewDetails from './pages/ReviewDetails';
import MyFavorites from './pages/MyFavorites';
import NotFound from './pages/NotFound';
import PrivateRoute from './routes/PrivateRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/all-reviews" element={<AllReviews />} />
                <Route path="/review/:id" element={<ReviewDetails />} />
                <Route path="/add-review" element={<PrivateRoute><AddReview /></PrivateRoute>} />
                <Route path="/my-reviews" element={<PrivateRoute><MyReviews /></PrivateRoute>} />
                <Route path="/edit-review/:id" element={<PrivateRoute><EditReview /></PrivateRoute>} />
                <Route path="/my-favorites" element={<PrivateRoute><MyFavorites /></PrivateRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

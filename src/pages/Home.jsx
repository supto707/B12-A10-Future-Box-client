import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import FeaturedReviews from '../components/home/FeaturedReviews';
import WhyJoinUs from '../components/home/WhyJoinUs';
import PopularCuisines from '../components/home/PopularCuisines';
import HowItWorks from '../components/home/HowItWorks';
import TopReviewers from '../components/home/TopReviewers';
import Testimonials from '../components/home/Testimonials';
import BlogPreview from '../components/home/BlogPreview';
import FAQ from '../components/home/FAQ';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Hero />
      <Stats />
      <FeaturedReviews />
      <HowItWorks />
      <PopularCuisines />
      <WhyJoinUs />
      <TopReviewers />
      <Testimonials />
      <BlogPreview />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;

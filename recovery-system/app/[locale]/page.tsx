import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import ProblemSection from '../../components/ProblemSection';
import ProductsSection from '../../components/ProductsSection';
import BenefitsSection from '../../components/BenefitsSection';
import TransformationSection from '../../components/TransformationSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import OfferSection from '../../components/OfferSection';
import FinalCTA from '../../components/FinalCTA';
import Footer from '../../components/Footer';
import StickyMobileCTA from '../../components/StickyMobileCTA';

export default function LocalizedHomePage() {
  return (
    <div className="ambient-bg min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ProductsSection />
      <BenefitsSection />
      <TransformationSection />
      <TestimonialsSection />
      <OfferSection />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

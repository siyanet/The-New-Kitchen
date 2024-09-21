
import GuestNavBar from '../Components/GuestNavBar';
import LandingHeader from '../Components/LandingHeader';
import AboutUsSection from '../Components/AboutUsSection';
import SpecialDealsSection from '../Components/SpecialDealsSection';
import RecommendedSection from '../Components/RecommendedSection';
import CatagoriesSection from '../Components/CatagoriesSection';
import ImageSection from '../Components/ImageSection';
import ReserveTable from '../Components/ReserveTable';
import TestimonialsSection from '../Components/TestimonialsSection';

const LandingPage = () => {
  return (
    <div className='w-full h-full'>
         <GuestNavBar />
         
         <LandingHeader/>
 <AboutUsSection/>
  <SpecialDealsSection/>
 <RecommendedSection/>
 <CatagoriesSection/>
 <ImageSection/>
 <ReserveTable/>
 <TestimonialsSection/>
    </div>
  );
}

export default LandingPage


import GuestNavBar from '../Components/GuestNavBar';
import LandingHeader from '../Components/LandingHeader';
import AboutUsSection from '../Components/AboutUsSection';
import SpecialDealsSection from '../Components/SpecialDealsSection';
import RecommendedSection from '../Components/RecommendedSection';
import CatagoriesSection from '../Components/CatagoriesSection';
import ImageSection from '../Components/ImageSection';
import ReserveTable from '../Components/ReserveTable';
import TestimonialsSection from '../Components/TestimonialsSection';
import PizzaHutMap from '../Components/PizzaHutMap';
import Footer from '../Components/footer';


const LandingPage = () => {
  // const dispatch = useDispatch(); 
  
  // const {status} = useSelector((state) => state.user);
  // useEffect(() =>{
  //   console.log("user fetch begin");

  //   const token = localStorage.getItem('pizzaHutToken');
    
  //   if (token) {
  //     console.log("there is token");
  //     dispatch(fetchUser());
  //   }



  // }, [dispatch]);
  // if(status == "loading"){
  //   return <p> Loading user data ...</p>;
  // }
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
 <PizzaHutMap/>
 <Footer/>
    </div>
  );
}

export default LandingPage

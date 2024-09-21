
import MenuButton from './MenuButton'
import ReviewComponent from './ReviewComponent'
const TestimonialsSection = () => {
  return (
    <div className='mt-20 flex w-full h-full'>
        <div className='w-1/2'>
        <p className='font-fredoka text-red font-normal text-sm md:text-lg'>Testimonials & Reviews</p>
        <p className='font-nunito text-black font-extrabold sm:text-base md:text-lg'>Our Customers FeedBack</p>
        <ReviewComponent rate = {3} comment = "A good restaurant is like a vacation; it transports you and it becomes a lot more than just about the food All great deeds and all great thoughts"
         name= "Bratlee Hamint"/>
        <div className="flex py-3">
            <div className="flex w-1/2 justify-between"> <div><button> . </button><button> . </button><button> . </button></div> </div>
            <MenuButton name={'see More'} />
            </div>
        </div>
        <div>

        </div>
      
    </div>
  )
}

export default TestimonialsSection

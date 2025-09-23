import AboutUsCard from "./AboutUsCard";


const AboutUsSection = () => {
    const about =  [{
        id: 1,
        image:"/aboutusicon.png",
        title: "Premium Quality",
        word: "The quality and safety of our products is ourtop priority. We continue to quest for evengreater product quality",
    },
{
    id:2,
    image: "/aboutusicon2.png",
    title: "Alway Fresh",
    word: "Botanica Shop is always committed to100% fresh, organic food has a certificate offood safety certification"
},
    {
        id:3,
        image: '/aboutusicon3.png',
        title: "Organic Farming",
        word: "Agricultural system that uses ecologicallybased pest controls and biological fertilizersderived largely from animal"
    }];
  return (
    <div className="mt-16 pl-3  pr-3 md:pr-6 md:pl-6  w-full h-full">
      <h1 className="font-extrabold font-nunito text-xl md:text-lg text-center">Who We Are, What We Do?</h1>

      <p className=" font-nunito font-normal text-base text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed dui tempor eros
porttitor tristique eget eu lectus. Sed auctor mi vitae velit aliquet, quis pharetra sem
vestibulum. Nam vel lectus imperdiet. </p>
<div className=" mt-6 flex flex-col sm:flex-row justify-center w-full sm:space-x-4">
    {about.map((abouti) => (
        <AboutUsCard key={abouti.id} img={abouti.image} title={abouti.title} word= {abouti.word} />
    ))}

</div>
    </div>
    
  );
};

export default AboutUsSection;

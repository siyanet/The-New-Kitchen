

            

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GuestNavBar from '../Components/GuestNavBar';
import MenuCard from '../Components/MenuCard';
import { fetchDiscountedItems } from '../Redux/DiscountSlice';
import { AppDispatch, RootState } from '../Redux/Store';
 // Ensure you have store types exported

const SpecialDealsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDiscountedItems());
  }, [dispatch]);

  const { discounts, discountLoading, discountError } = useSelector(
    (state: RootState) => state.discount
  );

  if (discountLoading) return <div>Loading...</div>;
  if (discountError) return <div>Error: {discountError}</div>;

  return (
    <div className="w-full h-full px-0 mx-0">
      <GuestNavBar />

      {/* Header section */}
      <div className="w-full bg-[url('/wave-haike.svg')] bg-cover bg-left lg:bg-center h-screen m-0 p-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-between w-full lg:flex-row">
          <div className="flex items-center justify-center w-full h-full max-w-2xl lg:w-1/2">
            <img
              src="/BurgerImage.png"
              className="w-full h-auto max-h-[400px] md:max-h-[700px] max-w-[400px] md:max-w-[900px] object-fit animate-move"
              alt="Burger"
            />
          </div>
          <div className="w-full h-full pl-6 text-center lg:w-1/2">
            <h1 className="text-lg font-normal text-white font-fredoka lg:text-xl lg:text-red">
              Special Deals
            </h1>
            <h2 className="text-lg font-semibold text-white font-epilogue lg:text-black">
              Don&apos;t miss out on our exclusive offer
            </h2>
            <p className="text-base font-normal text-gray-100 font-epilogue lg:text-black">
              Enjoy great savings on your favorite dishes and services. Grab these
              limited-time deals before they&apos;re gone!
            </p>
          </div>
        </div>
      </div>

      {/* Search input */}
      <div className="flex justify-center w-full h-auto mt-20">
        <input
          className="w-full px-3 py-1 m-4 text-center transition duration-200 border-2 rounded-md max-w-80 border-red focus:outline-none focus:ring-2 focus:ring-red focus:border-red"
          placeholder="Search"
        />
      </div>

      {/* Menu list */}
      <div className="flex flex-wrap justify-center gap-3 p-4 sm:justify-between">
        {discounts.map((item, index) => (
          <div className="w-1/2 sm:w-1/4 lg:w-1/5" key={item.id || index}>
            <MenuCard item={item.menu} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialDealsPage;

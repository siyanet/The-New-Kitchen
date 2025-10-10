


import AddToCartButton from "./AddToCartButton";
import { Menu ,Portion} from "../Redux/MenuSlice";

interface RecommendedCardProps {
  item: Menu;
}

const RecommendedCard: React.FC<RecommendedCardProps> = ({ item }) => {
  const portion = item.portions?.[0]; 
  return (
    <div className="relative z-10 w-full h-[450px]">
      <div className="relative flex flex-col justify-between w-full h-full bg-white rounded-md">
        <div className="relative w-full h-3/4">
          {/* Base Image */}
          <img src={item.image} alt={item.name} className="object-cover w-full h-full rounded-t-lg " />

          {/* Overlay Image */}
          <img
            src="/recommendedend.png"
            alt="Overlay"
            className="absolute bottom-0 right-0 object-cover"
          />
          <div className="absolute transform -translate-x-1/2 hover:cursor-pointer bottom-1 lg:bottom-3 left-1/2 ">
            <div className="flex items-center justify-center w-12 h-12 p-1 border-2 border-dashed rounded-full shadow-sm border-yellow">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow">
                <AddToCartButton item={item} recommended="true" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-2 text-center h-1/4">
          <p className="text-sm font-bold text-red font-nunito">
            {/* {portion.discount_price
              ? `$${item.discount_price}`
              : `$${item.price}`} */}
               {portion && portion.discounted_price ? (
              <>
                <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">
                  {portion.discounted_price} ETB
                </p>
                <p className="text-base font-extrabold text-gray-100 line-through font-nunito">
                  {portion.price} ETB
                </p>
              </>
            ) : portion ? (
              <p className="text-base font-extrabold text-red group-hover:text-white font-nunito">
                {portion.price} ETB
              </p>
            ) : (
              <p className="text-sm text-gray-400">No pricing available</p>
            )}
          </p>
          <p className="text-sm font-bold text-black font-nunito">{item.name}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCard;






import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuDetail } from '../Redux/MenuDetailSlice';
import { ClipLoader } from 'react-spinners';
import ReviewStar from '../Components/ReviewStar';
import { AppDispatch, RootState } from '../Redux/Store';

interface OwnerMenuDetailProps {
  id: string;
  toggleDetailView: () => void;
}

const OwnerMenuDetail: React.FC<OwnerMenuDetailProps> = ({ id, toggleDetailView }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { menuDetail, loading, error } = useSelector((state:RootState) => state.menuDetail);

  useEffect(() => {
    dispatch(fetchMenuDetail(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <ClipLoader size={35} color="#D97706" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!menuDetail) {
    return <div className="text-center">No menu details available</div>;
  }

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-full max-w-lg p-2">
        <i onClick={toggleDetailView} className="self-end mb-2 text-3xl text-gray-600 cursor-pointer fas fa-close" />

        <div className="flex flex-col overflow-hidden bg-purple-100 rounded-md shadow-lg">
          <img
            src={menuDetail.image || '/placeholder.jpg'}
            alt={menuDetail.name}
            className="object-cover w-full h-48"
          />

          <div className="flex flex-col items-center gap-2 px-4 py-3 bg-white">
            <p className="text-xl font-bold text-black font-fredoka">{menuDetail.name}</p>
            <p className="text-sm text-gray-700 font-nunito">{menuDetail.description}</p>
            <ReviewStar rating={menuDetail.average_rating} />
          </div>
        </div>

        <div className="mt-4 bg-white border border-gray-200 rounded-md shadow-sm">
          <h3 className="px-4 py-2 text-lg font-bold text-center text-gray-800 border-b font-nunito">Portions</h3>

          {menuDetail.portions && menuDetail.portions.length > 0 ? (
            menuDetail.portions.map((portion) => (
              <div key={portion.id} className="px-4 py-2 text-center">
                <span className="font-semibold text-gray-800">{portion.size}</span>
                <span className="mx-2 text-red-500">—</span>
                {portion.discounted_price ? (
                  <>
                    <span className="font-bold text-red-600">${portion.discounted_price}</span>
                    <span className="ml-2 text-gray-400 line-through">${portion.price}</span>
                  </>
                ) : (
                  <span className="font-bold text-red-600">${portion.price}</span>
                )}
              </div>
            ))
          ) : (
            <p className="py-4 text-sm text-center text-gray-500">No portion information available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerMenuDetail;

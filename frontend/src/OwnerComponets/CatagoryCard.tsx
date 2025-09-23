
import PropTypes from 'prop-types';

// const CategoryCard = ({item}) => {
   
//   return (
//     <div className='flex flex-col w-full h-full'>
//         <div className=' rounded-t-md'>
//         <img src={`http://127.0.0.1:8000/${item.category_image}`} className='object-cover w-full h-full'/></div>
//         <div className="flex flex-col justify-between bg-white shadow-lg rounded-b-md">
//             <div className="text-right">
//                 <p>{item.menu_count}</p>
//             </div>
//             <div className="flex justify-between">
//                 <p>{item.category_name}</p>
//                 <div>
//                     <div className='p-1 bg-gray-300 rounded-full'>
//                     <i className='text-black fas fa-edit'/>
//                     </div>
//                     <div className='p-1 bg-gray-300 rounded-full'>
//                     <i className='text-black fas fa-delete'/>
//                     </div>
                  
//                 </div>
//             </div>
//         </div>
      
//     </div>
//   )
// }

// CategoryCard.propTypes = {
//     item: PropTypes.shape({
//       category_id: PropTypes.number.isRequired,  // category_id must be a number and is required
//       category_name: PropTypes.string.isRequired,  // category_name must be a string and is required
//       category_image: PropTypes.string.isRequired,  // category_image must be a string (URL) and is required
//       menu_count: PropTypes.number.isRequired  // menu_count must be a number and is required
//     }).isRequired
//   };
// export default CategoryCard;









// const CategoryCard = ({ item,onEdit,isEditable= true,isActivable = true }) => {
//   return (
//     <div className='flex flex-col w-full h-full bg-white rounded-t-lg shadow-md'>
//       {/* Category Image */}
//       <div className='rounded-t-md'>
//         <img
//           src={`http://127.0.0.1:8000/${item.category_image}`}
//           alt={item.category_name}
//           className='object-cover w-full h-52 rounded-t-md'
//         />
//       </div>

//       {/* Card Content */}
//       <div className="flex flex-col justify-between flex-grow p-4 bg-white rounded-b-lg shadow-lg">
        
//         {/* Menu Count */}
//         <div className="text-right">
//           <p className="text-sm font-extrabold text-red font-nunito ">{item.menu_count} items</p>
//         </div>

//         {/* Category Name and Action Icons */}
//         <div className="flex items-center justify-between mt-2">
//           <p className="text-lg font-bold text-black font-nunito">{item.category_name}</p>
          
//           {/* Edit and Delete Icons */}
//           <div className="flex space-x-2">
//             {isEditable && (
//                <div onClick={onEdit} className='p-2 transition-colors bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400'>
//                <i className='text-black fas fa-edit'></i>
//              </div>

//             )}

//             {
//               isActivable && (
//                 <div className='p-2 transition-colors bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400'>
//                 <i className='text-black fas fa-trash'></i>
//               </div>
                
//               )
//             }
           
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// CategoryCard.propTypes = {
//   item: PropTypes.shape({
//     category_id: PropTypes.number.isRequired,  // category_id must be a number and is required
//     category_name: PropTypes.string.isRequired,  // category_name must be a string and is required
//     category_image: PropTypes.string.isRequired,  // category_image must be a string (URL) and is required
//     menu_count: PropTypes.number.isRequired  // menu_count must be a number and is required
//   }).isRequired,
//   onEdit: PropTypes.func.isRequired,
// };

// export default CategoryCard;



import { FC } from 'react';
import { Category } from '../Redux/CategorySlice';



interface CategoryCardProps {
  item: Category;
  onEdit: () => void;
  isEditable?: boolean;
  isActivable?: boolean;
}

const CategoryCard: FC<CategoryCardProps> = ({
  item,
  onEdit,
  isEditable = true,
  isActivable = true,
}) => {
  return (
    <div className="flex flex-col w-full h-full bg-white rounded-t-lg shadow-md">
      {/* Card Content */}
      <div className="flex flex-col justify-between flex-grow p-4 bg-white rounded-b-lg shadow-lg">
        {/* Menu Count */}
        <div className="text-right">
          <p className="text-sm font-extrabold text-red font-nunito">
            {item.menu_count} items
          </p>
        </div>

        {/* Category Name and Action Icons */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-bold text-black font-nunito">
            {item.name}
          </p>

          <div className="flex space-x-2">
            {isEditable && (
              <div
                onClick={onEdit}
                className="p-2 transition-colors bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400"
              >
                <i className="text-black fas fa-edit"></i>
              </div>
            )}

            {/* {isActivable && (
              <div className="p-2 transition-colors bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400">
                <i className="text-black fas fa-trash"></i>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;

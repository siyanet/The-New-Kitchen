
import PropTypes from 'prop-types';

// const CategoryCard = ({item}) => {
   
//   return (
//     <div className='w-full h-full flex flex-col'>
//         <div className=' rounded-t-md'>
//         <img src={`http://127.0.0.1:8000/${item.category_image}`} className='object-cover w-full h-full'/></div>
//         <div className="flex flex-col justify-between bg-white shadow-lg rounded-b-md">
//             <div className="text-right">
//                 <p>{item.menu_count}</p>
//             </div>
//             <div className="flex justify-between">
//                 <p>{item.category_name}</p>
//                 <div>
//                     <div className='rounded-full p-1 bg-gray-300'>
//                     <i className='fas fa-edit text-black'/>
//                     </div>
//                     <div className='rounded-full p-1 bg-gray-300'>
//                     <i className='fas fa-delete text-black'/>
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
const CategoryCard = ({ item,onEdit,isEditable= true,isActivable = true }) => {
  return (
    <div className='w-full h-full flex flex-col rounded-t-lg bg-white shadow-md'>
      {/* Category Image */}
      <div className='rounded-t-md'>
        <img
          src={`http://127.0.0.1:8000/${item.category_image}`}
          alt={item.category_name}
          className='object-cover w-full h-52 rounded-t-md'
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col justify-between bg-white shadow-lg rounded-b-lg p-4 flex-grow">
        
        {/* Menu Count */}
        <div className="text-right">
          <p className="text-sm text-red font-nunito font-extrabold ">{item.menu_count} items</p>
        </div>

        {/* Category Name and Action Icons */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-bold text-black font-nunito">{item.category_name}</p>
          
          {/* Edit and Delete Icons */}
          <div className="flex space-x-2">
            {isEditable && (
               <div onClick={onEdit} className='rounded-full p-2 bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer'>
               <i className='fas fa-edit text-black'></i>
             </div>

            )}

            {
              isActivable && (
                <div className='rounded-full p-2 bg-gray-300 hover:bg-gray-400 transition-colors cursor-pointer'>
                <i className='fas fa-trash text-black'></i>
              </div>
                
              )
            }
           
          </div>
        </div>
      </div>
    </div>
  );
}

CategoryCard.propTypes = {
  item: PropTypes.shape({
    category_id: PropTypes.number.isRequired,  // category_id must be a number and is required
    category_name: PropTypes.string.isRequired,  // category_name must be a string and is required
    category_image: PropTypes.string.isRequired,  // category_image must be a string (URL) and is required
    menu_count: PropTypes.number.isRequired  // menu_count must be a number and is required
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CategoryCard;

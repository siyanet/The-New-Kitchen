
import PropTypes from 'prop-types';



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

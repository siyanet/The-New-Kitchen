

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenus, Menu } from "../Redux/MenuSlice";
import { Category, fetchCategories } from "../Redux/CategorySlice";
import CategoryCard from "../OwnerComponets/CatagoryCard";
import MenuCard from "../Components/MenuCard";
import { AppDispatch, RootState } from "../Redux/Store";
import WaiterLayout from "../Waiter/WaiterLayout";


const WaiterHomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const dispatch: AppDispatch = useDispatch();

  const { category, categoryLoading, categoryError } = useSelector(
    (state: RootState) => state.category
  );
  const { menus, menusLoading, menusError: menuError } = useSelector(
    (state: RootState) => state.menu
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMenus());
  }, [dispatch]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const filteredMenus = selectedCategory
    ? menus.filter((menu: Menu) => menu.category === selectedCategory.id)
    : [];

  return (
    <WaiterLayout>
      {(categoryLoading || menusLoading) && <p className="text-center">Loading...</p>}

      {(menuError || categoryError) && (
        <div className="w-full h-full">
          <p className="text-center">Error fetching category and menu</p>
        </div>
      )}

      {category && category.length === 0 && !categoryLoading && (
        <div><p className="text-center">No Category Available</p></div>
      )}

      {category && category.length > 0 && (
        <div className="flex flex-col h-screen gap-10">
          <div className="flex-1 p-4 pb-24 overflow-y-auto border-b-8 h-1/2 border-yellow">
            <p className="m-5 text-2xl text-center font-fredoka">Categories</p>
            <div className="flex flex-wrap justify-between p-5 gap-7">
              {category.map((item: Category) => (
                <div key={item.id} className="w-1/4" onClick={() => handleCategorySelect(item)}>
                  <CategoryCard item={item} isEditable={false} onEdit={() => {}} isActivable={false} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto h-1/2">
            <p className="m-5 text-2xl text-center font-fredoka">Menus</p>
            <div className="flex flex-wrap justify-between p-10 gap-7">
              {filteredMenus.length > 0 ? (
                filteredMenus.map((menu: Menu) => (
                  <div className="w-1/4" key={menu.id}>
                    <MenuCard item={menu} />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Select a category to view menus</p>
              )}
            </div>
          </div>
        </div>
      )}
    </WaiterLayout>
  );
};

export default WaiterHomePage;

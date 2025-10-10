






import { useDispatch, useSelector } from "react-redux";

import OwnerMenuCard from "./OwnerMenuCard";
import { useEffect, useState } from "react";
import { fetchMenus, Menu } from "../Redux/MenuSlice";
import useForm from "../hooks/useForm";

import AxiosInstance from "../Components/AxiosInstance";
import { notify } from "../Components/notify";
import DiscountForm from "./DiscountForm";
import { AppDispatch, RootState } from "../Redux/Store";

interface OwnerDiscountAddProps {
  onClose: () => void;
}

interface FormState {
  menuId: string;
  discountedPercentage: string;
  start_date: string;
  end_date: string;
}



const OwnerDiscountAdd: React.FC<OwnerDiscountAddProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  const menus = useSelector((state: RootState) => state.menu.menus);
  const status = useSelector((state: RootState) => state.menu.menusLoading);
  const error = useSelector((state: RootState) => state.menu.menusError);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const initialState: FormState = {
    menuId: "",
    discountedPercentage: "",
    start_date: '',
    end_date: ''
  };

  const validationRules = {
    menuId: {
      required: true,
    },
    discountedPercentage: {
      required: true,
      minLength: 1,
      pattern: /^\d+(\.\d+)?$/,
    },
  };

  const { formState, errors, handleChange, validateForm } = useForm<FormState>(initialState, validationRules);

  const handleAddDiscount = (menu_id: string) => {
    handleChange("menuId", menu_id);
    setFormVisible(true);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("menu_item_id", formState.menuId);
      formData.append("percentage", formState.discountedPercentage);
      if (formState.start_date) formData.append("start_date", formState.start_date);
      if (formState.end_date) formData.append("end_date", formState.end_date);
      console.log("disc payload");
      console.log(formData.get("menu_id"));

      try {
        const response = await AxiosInstance.post("items/discounts/", formData, { withAuth: true });
        console.log("discount response");
        console.log(response);

        if (response.status === 201) {
          notify("Discount added successfully!", "success");

          setTimeout(() => {
            formState.discountedPercentage = "";
            formState.start_date = '';
            formState.end_date = '';
            formState.menuId = "";
            setFormVisible(false);
          }, 2200);
        } else {
          notify("Failed to add discount. Please try again.", "error");
          setTimeout(() => setFormVisible(false), 2200);
        }
      } catch (error) {
        console.log("disc error");
        console.log(error);
        notify("An error occurred while adding the discount.", "error");
        setTimeout(() => setFormVisible(false), 2200);
      }
    }
  };

  if (status) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg md:max-w-2xl">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-normal text-black font-fredoka">Menus</h1>
          <div>
            <i onClick={onClose} className="text-lg text-black cursor-pointer fas fa-remove" />
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2 mx-2 my-4 md:gap-1">
          {menus && menus.length === 0 && <p>No Menus available</p>}

          {menus.length > 0 &&
            menus.map((menu: Menu) => (
              <div className="w-2/5" key={menu.id}>
                <OwnerMenuCard
                  item={menu}
                  isAdd
                  onAdd={() => handleAddDiscount(menu.id)}
                  isEdit={false}
                  isRemove={false}
                />
              </div>
            ))}
        </div>

        {isFormVisible && (
          <DiscountForm
            formState={formState}
            handleChange={handleChange}
            errors={errors}
            handleFormSubmit={handleFormSubmit}
            onClose={() => setFormVisible(false)}
            isEditing={false}
          />
        )}
      </div>
    </div>
  );
};

export default OwnerDiscountAdd;

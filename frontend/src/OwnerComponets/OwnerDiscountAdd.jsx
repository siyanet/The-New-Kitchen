import { useDispatch, useSelector } from "react-redux"
import OwnerMenuCard from "./OwnerMenuCard";
import { useEffect, useState } from "react";
import { fetchMenus } from "../Redux/MenuSlice";
import useForm from "../hooks/useForm";
import { InputField, OwnerButton } from "./InputField";
import AxiosInstance from "../Components/AxiosInstance";
import { notify } from "../Components/notify";
import DiscountForm from "./DiscountForm";


const OwnerDiscountAdd = ({onClose}) => {
 
    const dispatch = useDispatch();
    const [isFormVisible, setFormVisible] = useState(false);

    const menus = useSelector((state) => state.menu.menus);
    const status = useSelector((state) => state.menu.status);
    const error = useSelector((state) => state.menu.error);
  

    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchMenus());
        }
      }, [dispatch,status]);

 
    const initialState = {
        menuId: "", // Store the selected menu ID
        discountedPercentage: "" // Store the discount percentage input
    };
  
    const validationRules = {
        menuId: {
            required: true, // Menu ID is required
        },
        discountedPercentage: {
            required: true, // Discount percentage is required
            minLength: 1, // Assuming at least 1 character is needed
            pattern: /^\d+(\.\d+)?$/ // Regex for valid decimal numbers
        }
    };
    const { formState, errors, handleChange, validateForm } = useForm(initialState, validationRules);

    const handleAddDiscount = (menu_id) => {
        handleChange('menuId', menu_id);
        setFormVisible(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData();
            formData.append("menu_id", formState.menuId);
            formData.append("discount_percentage", formState.discountedPercentage);

          
          
            try{
                const response = await AxiosInstance.post("/discounts",formData);
                if (response.status === 200) {
                    notify("Discount added successfully!", "success");

             
                    setTimeout(() => {
                        // Reset form state on success
                        formState.discountedPercentage = ""; // Ensure the correct state variable name
                        formState.menuId = "";
                        setFormVisible(false);
                    }, 2200); 
                } else {
                  
                
                    notify("Failed to add discount. Please try again.", "error");

                   
                    setTimeout(() => {
                        setFormVisible(false);
                    }, 2200);}
            } catch (error) {
                notify("An error occurred while adding the discount.", "error");

                // Delay resetting form state
                setTimeout(() => {
                    setFormVisible(false);
                }, 2200);
              
            } 

            }
           // Clear the discount input
            
        };
    
    if (status === 'loading') {
        return <div>Loading...</div>;
      }
      if (status === 'failed') {
        return <div>Error: {error}</div>;
      }

    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-10 max-w-md md:max-w-2xl w-full">

    <div className='flex justify-between w-full'>
    <h1 className='font-fredoka font-normal text-2xl text-black'>Menus</h1>
    <div className=''>
      <i onClick={onClose} className='fas fa-remove text-black text-lg' />
    </div>
  </div>
  <div className="my-4 mx-2 flex flex-wrap gap-2 md:gap-1 justify-between">

     {status ==="succeeded" && menus && menus.length ===0 &&(
        <div><p>No Menus available</p></div>
     )}
     {status === "succeeded" && menus && menus.length > 0 &&(
        menus.map((menu)=>(
            // <div className="flex w-1/4 " key={menu.menu_id}> 
            <div className="w-2/5" key={menu.menu_id}>
                 <OwnerMenuCard  item={menu}  isAdd={true} onAdd={()=> handleAddDiscount(menu.menu_id)} isEdit={false} isRemove={false}/> 
            </div>
                
               
))
        
       
        

     )} </div>

{/* {isFormVisible && (
                    <form onSubmit={handleFormSubmit} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-10">
                            <h2 className=" mb-4 font-fredoka text-center">Add Discount in percentage</h2>
                            <InputField 
                                label="Discount Percentage"
                                name="discountedPercentage"
                                value={formState.discountedPercentage}
                                onChange={handleChange}
                                error={errors.discountedPercentage}
                                type="number" // Use type="number" for percentage input
                            />
                            <div className="flex gap-14 mt-14">
                            <OwnerButton text="Add Discount" />
                            <OwnerButton text="Cancel" onclick={() => setFormVisible(false)} isRed />

                            </div>
  
                        </div>
                    </form>
                )} */}

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
  )
}

export default OwnerDiscountAdd;

import { useDispatch, useSelector } from "react-redux"
import OwnerNavBar from "../OwnerComponets/OwnerNavBar"
import OwnerSideBar from "../OwnerComponets/OwnerSideBar"
import OwnerHeader from "../OwnerComponets/OwnerTitle"
import OwnerMenuCard from "../OwnerComponets/OwnerMenuCard"
import { useEffect, useState } from "react"
import { fetchDiscountedItems } from "../Redux/DiscountSlice"
import OwnerDiscountAdd from "../OwnerComponets/OwnerDiscountAdd"
import { notify } from "../Components/notify"
import Confimation from "../Components/Confimation"
import DiscountForm from "../OwnerComponets/DiscountForm"
import useForm from "../hooks/useForm"
import AxiosInstance from "../Components/AxiosInstance"


const OwnerDiscount = () => {

    const validationRules = {
        discountedPercentage: {
            required: true,
            minLength: 1,
            pattern: /^\d+$/, // Ensures only numbers
        },
    };    
    const {items,loading,error} = useSelector((state)=>(state.discount));
    const dispatch = useDispatch();
    const [isAddView,setIsAddView] = useState(false);
    const [isEditView,setEditView]= useState(false);
    const [isRemoveView,setRemoveView]= useState(false);
    const [selectedDiscount, setSelectedDiscount] = useState(null); 
    
    const { formState, errors, handleChange, validateForm, setFormState } = useForm(
        { discountedPercentage: '' },
        validationRules
    );

    useEffect(()=>{
        dispatch(fetchDiscountedItems());
    },[dispatch])

    const handleAddView = (() =>{
        setIsAddView(!isAddView);
        setFormState({ discountedPercentage: '' });

    });
    const handleEditView = ((item)=>{
        setSelectedDiscount(item); // Set selected discount for editing
        setEditView(true);
        setIsAddView(false); // Close add view when editing
        setRemoveView(false); 
        setFormState({ discountedPercentage: item.discount_percentage });
    })
    const handleRemoveView = ((item)=>{
        setSelectedDiscount(item); // Set selected discount for removal confirmation
        setRemoveView(true);
        setIsAddView(false); // Close add view when removing
        setEditView(false);
    })
    const handleEditDiscount = async (e) => {
        e.preventDefault();
       
        if (!validateForm()) {
            return; // Stop if the form is invalid
        }

        const { discountedPercentage } = formState;

        try {
            const response = await AxiosInstance.post(`/discounts/${selectedDiscount.id}`, {
                discount_percentage: discountedPercentage // Pass the updated discount percentage
            });
            if(response.status === 200){
                notify("Discount updated successfully!", "success");
                setTimeout(() =>{
                    dispatch(fetchDiscountedItems()); // Refresh the discounted items
                    setEditView(false); 

                },2200)
               

            }
            else{
                notify("Unexpected response when updating discount. Please try again.", "error");

            }
           // Close edit view
        } catch (error) {
            notify("Failed to update discount. Please try again.", "error");
        }
    };
 

    const handleRemoveDiscount = async () => {
      
           

            try {
                const response = await AxiosInstance.delete(`/discounts/${selectedDiscount.id}`); // Adjust the endpoint as needed
                if(response.status === 204){
                    notify("Discount removed successfully!", "success");
            setTimeout(()=>{
                dispatch(fetchDiscountedItems()); // Refresh the discounted items
            setRemoveView(false);

            },2200);
                    
                }
                else {
                    notify("Unexpected response when removing discount. Please try again.", "error");
                }
            } catch (error) {
                notify("Failed to remove discount. Please try again. " + (error.response?.data?.message || error.message), "error");
            }



            
        
    };


  return (
    <div className="w-full h-full ">
      <OwnerNavBar /> 
      <OwnerSideBar />
      <div className='pl-28 pr-20 w-full h-full '>
       <OwnerHeader name="Discount" onAdd={handleAddView}/>
       <div className="flex  gap-5">
       {loading && <p>loading ...</p>}
       {error && <p>error {error}</p>}
      

{items && (
  items.map((item) => (
    
    <div className="w-1/2 sm:w-1/4 lg:w-1/4" key={item.menu_id}>
                <OwnerMenuCard item={item} isEdit={true} isRemove={true}  onRemove={() => handleRemoveView(item)}
                                onEdit={() => handleEditView(item)} />
              </div>
  ))
)}
       {!loading && items && items.length === 0 &&(
        <div className="flex w-full h-full  justify-between items-center text-center"><p className=" w-full font-nunito text-black text-2xl mt-10 text-center">No Discounted items</p></div>
       )}
       </div>
   
   
       </div>
       {isAddView &&(
        <OwnerDiscountAdd
        onClose = {handleAddView}
        />
       )}

       {isEditView &&(
          <DiscountForm
          formState={formState}
          handleChange={handleChange}
          errors={errors}
          handleFormSubmit={handleEditDiscount}
          onClose={() => setEditView(false)}
          isEditing={true} // Indicates editing an existing discount
      />
       )}

       {isRemoveView &&(
         <Confimation
         onCancel={() => setRemoveView(false)}
         isOpen={isRemoveView}

         onConfirm={handleRemoveDiscount}
         message={`Are you sure you want to remove the discount for ${selectedDiscount.menu_name}?`}
     />
       )}
       </div>
       
    )

}

export default OwnerDiscount

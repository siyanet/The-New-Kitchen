import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../Redux/LocationSlice";
import InputField ,{OwnerButton } from "./InputField";
import { fetchTables } from "../Redux/tableSlice";
import { notify } from "../Components/notify";
import useForm from "../hooks/useForm";
import AxiosInstance from "../Components/AxiosInstance";
const TableForm = ({tableToEdit,onClick}) => {
  const dispatch = useDispatch();
  console.log("table form");
  console.log(tableToEdit);
  const {locations,locationStatus,locationError} = useSelector((state) =>state.locations); 
  
    const validationRules = {
        table_name: { required: true, minLength: 3 },
        location_id: { required: true },
      };
      const {formState,setFormState,handleChange,validateForm,setErrors,errors} = useForm({table_name:"",location_id:""},validationRules);

      useEffect(() =>{
      dispatch(fetchLocations());

      },[dispatch]);
      useEffect(() =>{
        if(tableToEdit){
          setFormState({
            table_name:tableToEdit.table_name,
            location_id: tableToEdit.location_id}
          );
        }
      },[setFormState,tableToEdit]);
      const [loading, setLoading] = useState(false);

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const isValid = validateForm();
        if (!isValid) return;
      

    
        setLoading(true);
        console.log(formState);
    
        try {
          const endpoint = tableToEdit ? `/tables/${tableToEdit.id}` : "/tables";
          const response = await AxiosInstance.post(endpoint, formState);
    
          if (response.status === 201 || response.status === 200) {
            notify(`Table ${tableToEdit ? 'Updated' : 'Added'} Successfully!`, "success");
            setTimeout(() => {
              setFormState({ table_name: '', location_id: '' });
              dispatch(fetchTables(),); // Dispatch to update tables list
              onClick(); 
            }, 2000);
          } 
        } catch (err) {
          const errorMsg = err.response?.data?.message || err.message || 'An error occurred';
          setErrors({ submit: errorMsg });
        } finally {
          setLoading(false);
        }
      };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
       {locationStatus == "loading" && <div>loading...</div>}
       {locationError && <div>error fetching location</div>}
       {locations &&
        <form onSubmit={handleSubmit}>
        <h2 className="mb-10 text-2xl text-center text-black font-fredoka">
          {tableToEdit ? "Edit Table" : "Add New Table"}
        </h2>

        <InputField
          label="Table Name"
          name="table_name"
          value={formState.table_name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter Table name"
        />

        <div className="mb-5">
          <label className="block py-2 text-lg font-bold text-black font-nunito">Location</label>
          <div className="flex flex-col">
            {locations.map((location) => (
              <label key={location.id} className="flex items-center space-x-2">
                <InputField
                  type="radio"
                  name="location_id"
                  value={location.id}
                  checked={formState.location_id === location.id}
                  // onChange={handleChange}
                  onChange={() => handleChange('location_id', location.id)} 
                  className="form-radio"
                />
                <span className="text-black font-nunito">{location.name}</span>
              </label>
            ))}
            {errors.location && <p className="mt-1 text-xs text-red">{errors.location}</p>}
          </div>
        </div>

        {errors.submit && <p className="mb-4 text-xs text-red">{errors.submit}</p>}
        {loading && <p className="text-xs text-yellow">Adding/Updating table, please wait...</p>}

        <div className="flex justify-between mt-16 mb-4">
          <OwnerButton
            text={tableToEdit ? "Update Table" : "Add Table"}
            type="submit"
            isRed
            disabled={loading} 
          />
          <OwnerButton text="Cancel" onClick={onClick} />
        </div> 
      </form>
       
       
       
       
       }
       
        </div>
        </div>
  )
}

export default TableForm

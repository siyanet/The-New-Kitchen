


// import { useState, useEffect } from 'react';
// import useForm from '../hooks/useForm';
// import  InputField, {OwnerButton } from './InputField';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLocations } from '../Redux/LocationSlice';
// import AxiosInstance from '../Components/AxiosInstance';
// import { notify } from '../Components/notify';



// const StaffForm = ({staffToEdit,onClick }) => {
//     const dispatch = useDispatch();
//     const [loading,setLoading] = useState(false);

//     const {locations,locationStatus,locationError} = useSelector((state) =>state.locations); 
//   const initialState = {
//     phone: '',
//     locationId: '',
//     user:null,
//     schedule: [
//       { day: 'Monday', startTime: '', endTime: '' },
//       { day: 'Tuesday', startTime: '', endTime: '' },
//       { day: 'Wednesday', startTime: '', endTime: '' },
//       { day: 'Thursday', startTime: '', endTime: '' },
//       { day: 'Friday', startTime: '', endTime: '' },
//       { day: 'Saturday', startTime: '', endTime: '' },
//       { day: 'Sunday', startTime: '', endTime: '' },
//     ],
//   };

//   const validationRules = {
//     phone: { required: true, minLength: 10 }, // make sure this matches `initialState`
//     locationId: { required: true },
//     user: { required: false }, // add this even if not required
//     schedule: { required: false }, 
   
//   };

//   const { formState, errors, handleChange, validateForm, setFormState } = useForm(initialState, validationRules);


//   const [user, setUser] = useState(null);
//   const [userError, setUserError] = useState('');
//   useEffect(()=>{
//     dispatch(fetchLocations());
//   },[dispatch]);

//   useEffect(()=>{
//     if(staffToEdit){
//         setFormState({
           

//         });
//     }
//   },[setFormState,staffToEdit]);


//   // Handle phone number input change
//   const handlePhoneChange = async (name, value) => {
//     handleChange(name, value);
//     if (value.length === 12) {
//       try {
//         const response = await AxiosInstance.get(`/staffsearchbyphone?phone=${value}`);
//         if (response.data && response.data.user) {
//             setUser(response.data.user); 
            
//             console.log(user);// Accessing `user` object in the response
//             setUserError('');
//           } else {
//             setUserError(response.data.errors);
//             setUser(null);
//           }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.errors) {
//                 // Capture the errors from the response and store them in state
//                 setUserError(error.response.data.errors);
//               } 
//         }
//       }
  
//   };

//   const handleUserSelect = () => {
//     setFormState({ ...formState, userId: user.id });
//     setUserError(''); // Clear any error once user is selected
//   };

//   const handleRemoveUser = () => {
//     setUser(null);
//     setFormState({ ...formState, userId: null, phone: '' });
//   };

//   // Handle schedule time changes
//   const handleScheduleChange = (index, field, value) => {
//     const newSchedule = [...formState.schedule];
//     newSchedule[index][field] = value;
//     setFormState({ ...formState, schedule: newSchedule });
//   };

//   // Submit the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(!validateForm){
//       return;
//     }
//     if (validateForm()) {
//       if (!formState.userId) {
//         notify('Please select a user after searching by phone number',"error");
//         return;
//       }
//       const staffData = {
//         userId: formState.userId,
//         locationId: formState.locationId,
//         schedule: formState.schedule,
//       };
//       console.log('Staff data submitted:', staffData);
//       // Call your API to save staffData
//     }
   
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
//       {locationStatus == "loading" && <div>loading...</div>}
//       {locationError && <div>error fetching location</div>}
//       {locations && locations.length > 0 && (
//          <form onSubmit={handleSubmit} className="p-4 space-y-4">
       

// <div>
//               <label className="block py-2 text-lg font-bold text-black font-nunito">Phone Number</label>
//               {user ? (
//                 <div className="flex items-center p-2 space-x-2 bg-gray-200 rounded">
//                   <span>{user.name}</span>
//                   <button
//                     type="button"
//                     className="font-bold text-red"
//                     onClick={handleRemoveUser}
//                   >
//                     X
//                   </button>
//                 </div>
//               ) : (
//                 <InputField
//                   label="Phone Number"
//                   name="phone"
//                   value={formState.phone}
//                   onChange={handlePhoneChange}
//                   error={errors.phone}
//                 />
//               )}
//               {/* {user && (
//                 <button
//                   type="button"
//                   onClick={handleUserSelect}
//                   className="mt-2 text-blue-500 underline"
//                 >
//                   Select User
//                 </button>
//               )} */}
//             </div>
   
//          <div>
//            <label className="block py-2 text-lg font-bold text-black font-nunito">Location:</label>
//            {locations.map((location) => (
//              <label key={location.id} className="flex items-center">
//                <input
//                  type="radio"
//                  name="location"
//                  value={location.id}
//                  checked={formState.locationId === location.id.toString()}
//                  onChange={(e) => handleChange('locationId', e.target.value)}
//                  className="mr-2"
//                />
//                {location.name}
//              </label>
//            ))}
//            {errors.locationId && <p className="mt-1 text-xs text-red">{errors.locationId}</p>}
//          </div>
   
//          <div>
//            <label className="block py-2 text-lg font-bold text-black font-nunito">Schedule:</label>
//            {formState.schedule.map((slot, index) => (
//              <div key={index} className="flex items-center mb-2 space-x-4">
//                <span className="w-20">{slot.day}</span>
//                <input
//                  type="time"
//                  value={slot.startTime}
//                  onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
//                  className="p-2 border rounded"
//                />
//                <span>-</span>
//                <input
//                  type="time"
//                  value={slot.endTime}
//                  onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
//                  className="p-2 border rounded"
//                />
//              </div>
//            ))}
//          </div>
//          <div className="flex justify-between mt-16 mb-4">
//           <OwnerButton
//             text={staffToEdit ? "Update Staff" : "Add Staff"}
//             type="submit"
//             isRed
//             // disabled={loading} 
//           />
//           <OwnerButton text="Cancel" onClick={onClick} />
//         </div> 
   
//          {/* <OwnerButton text="Save Staff" onclick={handleSubmit} /> */}
//        </form>

//       ) }
     
//         </div>
//         </div>
    
//   );
// };

// export default StaffForm;


  {/* <InputField
           label="Phone Number"
           name="phone"
           value={formState.phone}
           onChange={handlePhoneChange}
           error={errors.phone || userError}
         /> */}

{/* {user && (
              <div className="mb-4">
                <label className="block py-2 text-lg font-bold text-black font-nunito">Select User:</label>
                <select
                  name="selectedUserId"
                  value={formState.selectedUserId}
                  onChange={(e) => handleUserSelect(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a user</option>
                  {searchResults.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.phone}
                    </option>
                  ))}
                </select>
                {errors.selectedUserId && <p className="mt-1 text-xs text-red">{errors.selectedUserId}</p>}
              </div>
            )} */}

{/* {user && (
              <div className="flex items-center mt-2 space-x-2">
                <p>{user.name} - {user.phone}</p>
                <button type="button" onClick={handleUserSelect} className="text-blue-500 underline">
                  Select User
                </button>
              </div>
            )} */}


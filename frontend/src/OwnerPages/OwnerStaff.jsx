import { useDispatch, useSelector } from "react-redux"
import OwnerNavBar from "../OwnerComponets/OwnerNavBar"
import OwnerSideBar from "../OwnerComponets/OwnerSideBar"
import OwnerHeader from "../OwnerComponets/OwnerTitle"
import { useEffect, useState } from "react"
import { fetchStaff } from "../Redux/staffSlice"
import OwnerTableComponent from "../OwnerComponets/OwnerTableComponent"
import StaffForm from "../OwnerComponets/StaffForm"


const OwnerStaff = () => {
    const dispatch = useDispatch();
    const {staffs,staffLoading,staffError} = useSelector((state) => state.staff);
    const [isAddView,setIsAddView] = useState(false);
    const [selectedStaff,setSelectedStaff] = useState(null);
    useEffect(() =>{
        dispatch(fetchStaff());

    },[dispatch])
    const headers = ["Staff Id","Name","Location","Phone Number", "Role", "Action"]
    const rows = staffs.map((staff)=>({
        id:staff.id,
        user_id: staff.user_id,
        user_name: staff.user.name,
        phone_number: staff.user.phone,
        role: staff.user.roles[0].name,
        role_id: staff.user.roles[0].id,
        location_id: staff.location.id,
        location_name: staff.location.name,
        status: staff.status,



    }));
    const handleAdd = (()=>{
        setSelectedStaff(null);
        setIsAddView(!isAddView);

    });
    const handleEdit = ((staff)=>{
        setSelectedStaff(staff);
        setIsAddView(!isAddView);
    })
  return (
    <div className="w-full h-full">
       
        <OwnerNavBar/>
        <OwnerSideBar/>
         <div className='pl-28 pr-20'>
            <OwnerHeader name="Staff" onAdd={handleAdd}/>
            {staffLoading && <p>Loading...</p>}
            {staffError && <p>Error Fetching </p>}
            {!staffLoading && !staffError && (
                <OwnerTableComponent
                headers={headers}
                rows={rows}
                isEditable={true}
                onEdit={handleEdit}
                isActivable = {true}
                isStaff = {true}/>
            )}
        </div>
        {isAddView && (<StaffForm onAdd= {handleAdd} onClick = {handleAdd} staffToEdit= {selectedStaff}/>)}

        
  
      
    </div>
  )
}

export default OwnerStaff

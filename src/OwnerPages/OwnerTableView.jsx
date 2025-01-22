import { useDispatch, useSelector } from "react-redux";
import OwnerNavBar from "../OwnerComponets/OwnerNavBar";
import OwnerSideBar from "../OwnerComponets/OwnerSideBar";
import OwnerHeader from "../OwnerComponets/OwnerTitle";
import { fetchTables } from "../Redux/tableSlice";
import { useEffect, useState } from "react";
import OwnerTableComponent from "../OwnerComponets/OwnerTableComponent";
import TableForm from "../OwnerComponets/TableForm";



const OwnerTableView = () => {
 

  const dispatch = useDispatch(); 
  const { tables, loading, error } = useSelector((state) => state.tables);

  const [isAddView, setIsAddView] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);


  
  const headers = ['Table ID',"Table Name", 'Location Name',  'Actions'];

  // Convert tables data into rows format for the OwnerTableComponent
  const rows = tables.map((table) => ({
    id: table.table_id,
    table_name:table.table_name,
    location_name: table.location_name,
    location_id: table.location_id,
   
    
 } ));
  const handleEdit = (table) => {
    setSelectedTable(table);
    console.log(table);
    setIsAddView(!isAddView);
    
  };

  const handleStatusChange = (table_id, isChecked) => {
    console.log(`Change status for row: ${table_id}, checked: ${isChecked}`);
  };

  const handleAddView = () =>{
    setSelectedTable(null); // Reset selected category for adding
    setIsAddView(!isAddView);
  }



  
  return (
    <div className="w-full h-full">
     


      <OwnerNavBar/>
      <OwnerSideBar/>
      <div className='pl-28 pr-20'>
      <OwnerHeader name='Table' onAdd={handleAddView}/>

      {loading && <p>Loading tables...</p>}
      {error && <p>Error: {error}</p>}
      
      {!loading && !error && (
        <OwnerTableComponent
          headers={headers}
          rows={rows}
          isTable={true}
          isEditable={true}
          onEdit={handleEdit}
          isActivable={true}
          onStatusChange={handleStatusChange}
        />
      )}

   

      </div>
      {isAddView &&( <TableForm onClick={handleAddView} tableToEdit={selectedTable}/>
    )}
      


    </div>
  );
  
};

export default OwnerTableView;






































// const dispatch = useDispatch();
  
//   // Use useSelector to access locations, status, and error from the Redux store
//   const locations = useSelector((state) => state.locations.locations);
//   const locationStatus = useSelector((state) => state.locations.locationStatus);
//   const locationError = useSelector((state) => state.locations.locationError);

//   // Fetch locations when the component mounts
//   useEffect(() => {
//     if (locationStatus === 'idle') {
//       dispatch(fetchLocations());
//     }
//   }, [locationStatus, dispatch]);

//   if (locationStatus === 'loading') {
//     return <p>Loading locations...</p>;
//   }

//   // Render an error message if there was an issue fetching the data
//   if (locationStatus === 'failed') {
//     return <p>Error fetching locations: {locationError}</p>;
//   }
//   console.log(locations);

//   return (
//     <div>
//       <h1 className='text-center'>Location List</h1>
      
//       {/* Show loading indicator */}


//       {/* Render the locations once they are fetched */}
//       {locationStatus === 'succeeded' && (
        
//         <ul>
//           {locations.map((location) => (
//             <li key={location.id}>{location.name}</li> // Adjust according to your location data structure
//           ))}
//         </ul>
//       )}
//     </div>
//   );
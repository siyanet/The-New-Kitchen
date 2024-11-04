import PropTypes from 'prop-types';


const OwnerTableComponent = ({headers,isTable,isStaff,rows,isEditable,onEdit,isActivable,onStatusChange}) => {
  console.log("rows");
  console.log(rows);
  return (
   <table className='min-w-full  text-center mt-10  '>
    <thead>
      <tr className=''>
      {/* {headers.map((header,index) =>(
        <th key = {index} className='border text-white font-nunito  px-4 py-2'>
          {header}
        </th>

      ))} */}
      {headers.map((header, index) => (
        <th
          key={index}
          className={`text-white bg-red px-4 py-3 ${
            index === 0 ? 'rounded-l-lg' : '' // Round left corners of the first header cell
          } ${
            index === headers.length - 1 ? 'rounded-r-lg' : '' // Round right corners of the last header cell
          }`}
        >
          {header}
        </th>
      ))}

       
      </tr>

    </thead>


    <tbody>
      {rows.map((row,rowIndex) =>(
        <tr key={row.id} 
        className={`${rowIndex % 2 !== 0 ? 'bg-gray-200 rounded-lg' : ''}`}
        >
          {isTable &&(
            <>
            {/* <td>{row.id}</td>
            <td>{row.table_name}</td>
            <td>{row.location_name}</td> */}
            <td className="px-2 py-1 rounded-l-lg">{row.id}</td>
            <td className="px-2 py-1">{row.table_name}</td>
            <td className="px-2 py-1 ">{row.location_name}</td>
            </>

          )}
          {isStaff && (
            <>
            {/* <td>{row.id}</td>
            <td>{row.user_name}</td>
            <td>{row.location_name}</td>
            <td>{row.phone_number}</td>
            <td>{row.role}</td> */}

            <td className="px-2 py-1 rounded-l-lg">{row.id}</td>
            <td className="px-2 py-1">{row.user_name}</td>
            <td className="px-2 py-1">{row.location_name}</td>
            <td className="px-2 py-1">{row.phone_number}</td>
            <td className="px-2 py-1 ">{row.role}</td>
            

            </>
          )}
          
            
            


            {isEditable && (<td className='px-4 py-2 rounded-r-lg'>
              <button onClick={() =>onEdit(row)} className='p-1 mr-3 bg-gray-100 rounded-full'>
                <i className='fas fa-edit text-black '/></button>
                <input
                  type="checkbox"
                  onChange={(e) => onStatusChange(row.id, e.target.checked)} // Pass the rowIndex and checked status
                  checked={row.isActive || false} // Assuming each row has an `isActive` property
                />
        

                </td>
              )}
              
              
              
              {/* {isActivable && (<td>
                <input
                  type="checkbox"
                  onChange={(e) => onStatusChange(row.id, e.target.checked)} // Pass the rowIndex and checked status
                  checked={row.isActive || false} // Assuming each row has an `isActive` property
                />
        

                </td>)} */}
        
          

        </tr>
      ))}
    </tbody>
   </table>
  );
}
OwnerTableComponent.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  isEditable: PropTypes.bool,
  onEdit: PropTypes.func,
  isActivable: PropTypes.bool,
  onStatusChange: PropTypes.func,
};

OwnerTableComponent.defaultProps = {
  isEditable: false,
  isActivable: false,
};

export default OwnerTableComponent

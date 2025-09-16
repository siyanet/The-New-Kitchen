// import PropTypes from 'prop-types';


// const OwnerTableComponent = ({headers,isTable,isStaff,rows,isEditable,onEdit,isActivable,onStatusChange}) => {
//   console.log("rows");
//   console.log(rows);
//   return (
//    <table className='min-w-full  text-center mt-10  '>
//     <thead>
//       <tr className=''>
//       {/* {headers.map((header,index) =>(
//         <th key = {index} className='border text-white font-nunito  px-4 py-2'>
//           {header}
//         </th>

//       ))} */}
//       {headers.map((header, index) => (
//         <th
//           key={index}
//           className={`text-white bg-red px-4 py-3 ${
//             index === 0 ? 'rounded-l-lg' : '' // Round left corners of the first header cell
//           } ${
//             index === headers.length - 1 ? 'rounded-r-lg' : '' // Round right corners of the last header cell
//           }`}
//         >
//           {header}
//         </th>
//       ))}

       
//       </tr>

//     </thead>


//     <tbody>
//       {rows.map((row,rowIndex) =>(
//         <tr key={row.id} 
//         className={`${rowIndex % 2 !== 0 ? 'bg-gray-200 rounded-lg' : ''}`}
//         >
//           {isTable &&(
//             <>
//             {/* <td>{row.id}</td>
//             <td>{row.table_name}</td>
//             <td>{row.location_name}</td> */}
//             <td className="px-2 py-1 rounded-l-lg">{row.id}</td>
//             <td className="px-2 py-1">{row.table_name}</td>
//             <td className="px-2 py-1 ">{row.location_name}</td>
//             </>

//           )}
//           {isStaff && (
//             <>
//             {/* <td>{row.id}</td>
//             <td>{row.user_name}</td>
//             <td>{row.location_name}</td>
//             <td>{row.phone_number}</td>
//             <td>{row.role}</td> */}

//             <td className="px-2 py-1 rounded-l-lg">{row.id}</td>
//             <td className="px-2 py-1">{row.user_name}</td>
//             <td className="px-2 py-1">{row.location_name}</td>
//             <td className="px-2 py-1">{row.phone_number}</td>
//             <td className="px-2 py-1 ">{row.role}</td>
            

//             </>
//           )}
          
            
            


//             {isEditable && (<td className='px-4 py-2 rounded-r-lg'>
//               <button onClick={() =>onEdit(row)} className='p-1 mr-3 bg-gray-100 rounded-full'>
//                 <i className='fas fa-edit text-black '/></button>
//                 <input
//                   type="checkbox"
//                   onChange={(e) => onStatusChange(row.id, e.target.checked)} // Pass the rowIndex and checked status
//                   checked={row.isActive || false} // Assuming each row has an `isActive` property
//                 />
        

//                 </td>
//               )}
              
              
              
//               {/* {isActivable && (<td>
//                 <input
//                   type="checkbox"
//                   onChange={(e) => onStatusChange(row.id, e.target.checked)} // Pass the rowIndex and checked status
//                   checked={row.isActive || false} // Assuming each row has an `isActive` property
//                 />
        

//                 </td>)} */}
        
          

//         </tr>
//       ))}
//     </tbody>
//    </table>
//   );
// }
// OwnerTableComponent.propTypes = {
//   headers: PropTypes.arrayOf(PropTypes.string).isRequired,
//   rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
//   isEditable: PropTypes.bool,
//   onEdit: PropTypes.func,
//   isActivable: PropTypes.bool,
//   onStatusChange: PropTypes.func,
// };

// OwnerTableComponent.defaultProps = {
//   isEditable: false,
//   isActivable: false,
// };

// export default OwnerTableComponent



// import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import Logo from "../Components/logo";

// const StyledTable = styled.table`
//   width: 100%;
//   margin-top: 2.5rem;
//   text-align: center;
//   min-width: 100%;
// `;

// const TableHeader = styled.thead`
//   background-color: red; // Change to your desired color
//   color: white;
// `;

// const HeaderCell = styled.th`
//   padding: 0.75rem;
//   font-family: 'Nunito', sans-serif;
//   ${(props) => props.isFirst && 'border-top-left-radius: 0.75rem;'}
//   ${(props) => props.isLast && 'border-top-right-radius: 0.75rem;'}
// `;

// const TableRow = styled.tr`
//   background-color: ${(props) => (props.isEven ? '#f7f7f7' : 'transparent')};
//   border-radius: 0.75rem;
// `;

// const TableCell = styled.td`
//   padding: 0.5rem;
//   ${(props) => props.isFirst && 'border-bottom-left-radius: 0.75rem;'}
//   ${(props) => props.isLast && 'border-bottom-right-radius: 0.75rem;'}
// `;

// const EditableCell = styled(TableCell)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const EditButton = styled.button`
//   padding: 0.25rem;
//   margin-right: 0.75rem;
//   background-color: #f7f7f7;
//   border-radius: 50%;
//   cursor: pointer;

//   i {
//     color: black;
//   }
// `;

// const OwnerTableComponent = ({
//   headers,
//   isTable,
//   isStaff,
//   rows,
//   isEditable,
//   onEdit,
//   isActivable,
//   onStatusChange,
// }) => {
//   return (
//     <StyledTable>
//       <TableHeader>
//         <tr>
//           {headers.map((header, index) => (
//             <HeaderCell
//               key={index}
//               isFirst={index === 0}
//               isLast={index === headers.length - 1}
//             >
//               {header}
//             </HeaderCell>
//           ))}
//         </tr>
//       </TableHeader>

//       <tbody>
//         {rows.map((row, rowIndex) => (
//           <TableRow key={row.id} isEven={rowIndex % 2 === 0}>
//             {isTable && (
//               <>
//                 <TableCell isFirst>{row.id}</TableCell>
//                 <TableCell>{row.table_name}</TableCell>
//                 <TableCell isLast>{row.location_name}</TableCell>
//               </>
//             )}
//             {isStaff && (
//               <>
//                 <TableCell isFirst>{row.id}</TableCell>
//                 <TableCell>{row.user_name}</TableCell>
//                 <TableCell>{row.location_name}</TableCell>
//                 <TableCell>{row.phone_number}</TableCell>
//                 <TableCell isLast>{row.role}</TableCell>
//               </>
//             )}
//             {isEditable && (
//               <EditableCell isLast>
//                 <EditButton onClick={() => onEdit(row)}>
//                   <i className="fas fa-edit" />
//                 </EditButton>
//                 <input
//                   type="checkbox"
//                   onChange={(e) => onStatusChange(row.id, e.target.checked)}
//                   checked={row.isActive || false}
//                 />
//               </EditableCell>
//             )}
//           </TableRow>
//         ))}
//       </tbody>
//     </StyledTable>
//   );
// };

// OwnerTableComponent.propTypes = {
//   headers: PropTypes.arrayOf(PropTypes.string).isRequired,
//   rows: PropTypes.arrayOf(PropTypes.object).isRequired,
//   isEditable: PropTypes.bool,
//   onEdit: PropTypes.func,
//   isActivable: PropTypes.bool,
//   onStatusChange: PropTypes.func,
// };

// OwnerTableComponent.defaultProps = {
//   isEditable: false,
//   isActivable: false,
// };

// export default OwnerTableComponent;




import PropTypes from 'prop-types';
import styled from 'styled-components';


// Styled components using Tailwind CSS classes
export const StyledTable = styled.table.attrs({
  className: 'w-full mt-10 text-center min-w-full', // Tailwind CSS classes
})``;

 export const TableHeader = styled.thead.attrs({
  className: 'bg-red text-white', // Tailwind CSS classes
})``;

export const HeaderCell = styled.th.attrs((props) => ({
  className: `p-3 font-sans ${props.isFirst ? 'rounded-tl-lg' : ''} ${props.isLast ? 'rounded-tr-lg' : ''}`, // Tailwind CSS classes
}))``;

export const TableRow = styled.tr.attrs((props) => ({
  className: `${props.isEven ? 'bg-gray-100 rounded-lg' : ''}`, // Tailwind CSS classes
}))``;

export const TableCell = styled.td.attrs((props) => ({
  className: `p-2 ${props.isFirst ? 'rounded-bl-lg' : ''} ${props.isLast ? 'rounded-br-lg' : ''}`, // Tailwind CSS classes
}))``;

const EditableCell = styled(TableCell).attrs({
  className: 'flex items-center justify-center p-2 rounded-br-lg', // Tailwind CSS classes
})``;

const EditButton = styled.button.attrs({
  className: 'p-1 mr-3 bg-gray-200 rounded-full cursor-pointer', // Tailwind CSS classes
})``;

const OwnerTableComponent = ({
  headers,
  isTable,
  isStaff,
  rows,
  isEditable,
  onEdit,
  isActivable,
  onStatusChange,
}) => {
  return (
    <StyledTable>
      <TableHeader>
        <tr>
          {headers.map((header, index) => (
            <HeaderCell
              key={index}
              isFirst={index === 0}
              isLast={index === headers.length - 1}
            >
              {header}
            </HeaderCell>
          ))}
        </tr>
      </TableHeader>

      <tbody>
        {rows.map((row, rowIndex) => (
          <TableRow key={row.id} isEven={rowIndex % 2 != 0}>
            {isTable && (
              <>
                <TableCell isFirst>{row.id}</TableCell>
                <TableCell>{row.table_name}</TableCell>
                <TableCell isLast>{row.location_name}</TableCell>
              </>
            )}
            {isStaff && (
              <>
                <TableCell isFirst>{row.id}</TableCell>
                <TableCell>{row.user_name}</TableCell>
                <TableCell>{row.location_name}</TableCell>
                <TableCell>{row.phone_number}</TableCell>
                <TableCell isLast>{row.role}</TableCell>
              </>
            )}
            {isEditable && (
              <EditableCell>
                <EditButton onClick={() => onEdit(row)}>
                  <i className="fas fa-edit text-black" />
                </EditButton>
                <input
                  type="checkbox"
                  onChange={(e) => onStatusChange(row.id, e.target.checked)}
                  checked={row.isActive || false}
                />
              </EditableCell>
            )}
          </TableRow>
        ))}
      </tbody>
    </StyledTable>
  );
};

OwnerTableComponent.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditable: PropTypes.bool,
  onEdit: PropTypes.func,
  isActivable: PropTypes.bool,
  onStatusChange: PropTypes.func,
};

OwnerTableComponent.defaultProps = {
  isEditable: false,
  isActivable: false,
};

export default OwnerTableComponent;

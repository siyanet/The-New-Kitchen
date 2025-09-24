


// pages/BranchesPage.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/Store';
import { Branch, fetchBranches } from '../Redux/branchSlice';
import { StyledTable,  TableHeader,
   HeaderCell,
   TableRow,
  TableCell,
  EditableCell,
  EditButton, } from '../OwnerComponets/TableStyles';
import OwnerSideBar from '../OwnerComponets/OwnerSideBar';
import OwnerHeader from '../OwnerComponets/OwnerTitle';
import OwnerNavBar from '../OwnerComponets/OwnerNavBar';
import BranchForm from '../OwnerComponets/BranchForm';


const BranchesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { branches, loading, error } = useSelector((state: RootState) => state.branch);
const [isFormVisible, setIsFormVisible] = useState(false);
const [branchToEdit, setBranchToEdit] = useState<Branch | null>(null);
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Branch, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    latitude: '',
    longitude: '',
    description: '',
    phone_number: '',
  });

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleEditClick = (branch: Branch) => {
    setEditingBranchId(branch.id);
    setForm({
      name: branch.name,
      latitude: branch.latitude,
      longitude: branch.longitude,
      description: branch.description,
      phone_number: branch.phone_number,
    });
  };
  const handleEditBranch = (branch: Branch) => {
  setBranchToEdit(branch);
  setIsFormVisible(true);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleAddBranch = () => {
  setBranchToEdit(null);
  setIsFormVisible(true);
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBranchId) {
      // Ideally you'd dispatch an updateBranch thunk here
      console.log('Editing branch:', { id: editingBranchId, ...form });
    } else {
      // Ideally you'd dispatch an addBranch thunk here
      console.log('Adding new branch:', form);
    }
    setEditingBranchId(null);
    setForm({ name: '', latitude: '', longitude: '', description: '', phone_number: '' });
  };

  return (
    <div className="">
         <OwnerNavBar />
      <OwnerSideBar />
      <div className='pl-48 pr-20'>
       <OwnerHeader name="Branches" onAdd={handleAddBranch}/>

        {/* <OwnerNavBar/>
        <OwnerSideBar/>
   <div className='pl-48 pr-28'>
         
   
<OwnerHeader name="Branches" onAdd={handleAddBranch} />
    */}


      

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <StyledTable>
          <TableHeader>
            <tr>
              {['Name', 'Phone', 'Description', 'Location (Lat, Long)', 'Actions'].map((header, i, arr) => (
                <HeaderCell key={header} isFirst={i === 0} isLast={i === arr.length - 1}>
                  {header}
                </HeaderCell>
              ))}
            </tr>
          </TableHeader>
          <tbody>
            {branches.map((branch, i) => (
              <TableRow key={branch.id} isEven={i % 2 !== 0}>
                <TableCell isFirst>{branch.name}</TableCell>
                <TableCell>{branch.phone_number}</TableCell>
                <TableCell>{branch.description}</TableCell>
                <TableCell>
                  {branch.latitude}, {branch.longitude}
                </TableCell>
                <EditableCell>
 <EditButton onClick={() => handleEditBranch(branch)}> <i className="text-black fas fa-edit" /></EditButton>
                    {/* <i className="text-black fas fa-edit" />
                  </EditButton> */}
                </EditableCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      )}
   </div>
   {isFormVisible && (
  <BranchForm
    onClick={() => setIsFormVisible(false)}
    branchToEdit={branchToEdit ?? undefined}
  />
)}
    </div>
  );
};

export default BranchesPage;

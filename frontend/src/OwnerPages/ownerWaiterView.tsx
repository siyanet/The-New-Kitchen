
// pages/OwnerWaiterView.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/Store';
import { fetchWaiters, Waiter } from '../Redux/waiterSlice';
import OwnerNavBar from '../OwnerComponets/OwnerNavBar';
import OwnerSideBar from '../OwnerComponets/OwnerSideBar';
import OwnerHeader from '../OwnerComponets/OwnerTitle';
import { StyledTable, TableHeader, HeaderCell, TableRow, TableCell, EditableCell, EditButton } from '../OwnerComponets/TableStyles';
import OwnerWaiterForm from '../OwnerComponets/WaiterForm';

const OwnerWaiterView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { waiters, loading, error } = useSelector((state: RootState) => state.waiters);

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Waiter | null>(null);

  useEffect(() => {
    dispatch(fetchWaiters());
  }, [dispatch]);

  const handleAddWaiter = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEditWaiter = (waiter: Waiter) => {
    setEditData(waiter);
    setShowForm(true);
  };

  return (
    <div className="">
           <OwnerNavBar />
              <OwnerSideBar />
              <div className='pl-48 pr-20'>
               <OwnerHeader name="Waiters" onAdd={handleAddWaiter}/>
        
      {/* <OwnerNavBar />
      <OwnerSideBar />
      <div className="pl-48 pr-28">
        <OwnerHeader name="Waiters" onAdd={handleAddWaiter} /> */}

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <StyledTable>
            <TableHeader>
              <tr>
                {['Staff Name', 'Email', 'Branch', 'QR Token', 'QR Image', 'Actions'].map((header, i, arr) => (
                  <HeaderCell key={header} isFirst={i === 0} isLast={i === arr.length - 1}>
                    {header}
                  </HeaderCell>
                ))}
              </tr>
            </TableHeader>
            <tbody>
              {waiters.map((waiter, i) => (
                <TableRow key={waiter.id} isEven={i % 2 !== 0}>
                  <TableCell isFirst>{waiter.staff?.user?.full_name ?? 'N/A'}</TableCell>
                  <TableCell>{waiter.staff?.user?.email ?? 'N/A'}</TableCell>
                  <TableCell>{waiter.staff.branch?.name ?? 'N/A'}</TableCell>
                  <TableCell>{waiter.qr_token}</TableCell>
                  <TableCell>
                    {waiter.qr_image ? (
                      <img src={waiter.qr_image} alt="QR Code" className="object-cover w-12 h-12" />
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <EditableCell>
                    <EditButton onClick={() => handleEditWaiter(waiter)}>Edit</EditButton>
                  </EditableCell>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        )}
      </div>

      {showForm && (
        <OwnerWaiterForm
          onClick={() => setShowForm(false)}
          waiterToEdit={editData ?? undefined}
        />
      )}
    </div>
  );
};

export default OwnerWaiterView;

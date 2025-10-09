import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OwnerNavBar from "../OwnerComponets/OwnerNavBar";
import OwnerSideBar from "../OwnerComponets/OwnerSideBar";
import OwnerHeader from "../OwnerComponets/OwnerTitle";
import OwnerTableComponent from "../OwnerComponets/OwnerTableComponent";
import { fetchKitchens, Kitchen } from "../Redux/kitchenSlice";
import { AppDispatch, RootState } from "../Redux/Store";
import KitchenForm from "../OwnerComponets/KitchenForm";



interface RowData {
  id: number | string;
  [key: string]: any;
}

const OwnerKitchenView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { kitchens, loading, error } = useSelector(
    (state: RootState) => state.kitchens
  );
    const [showForm, setShowForm] = useState(false); // ⬅️ State to toggle form


  useEffect(() => {
    dispatch(fetchKitchens());
  }, [dispatch]);

  const headers: string[] = [
    "Kitchen ID",
    "Staff Name",
    "Email",
    "Branch Name",
    "Categories",
    "Actions",
  ];

  const rows: RowData[] = kitchens.map((kitchen: Kitchen) => ({
    id: kitchen.id,
    "Kitchen ID": kitchen.id,
    "Staff Name": kitchen.staff?.user?.full_name ?? "N/A",
    Email: kitchen.staff?.user?.email ?? "N/A",
    "Branch Name": kitchen.staff?.branch?.name ?? "N/A",
    Categories: kitchen.categories_detail
      .map((cat) => `${cat.name} (${cat.menu_count})`)
      .join(", "),
  }));

  const handleEdit = (row: RowData) => {
    console.log("Edit clicked", row);
  };

  const handleStatusChange = (id: number | string, isChecked: boolean) => {
    console.log("Status toggle", id, isChecked);
  };
   const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="w-full h-full">
      <OwnerNavBar />
      <OwnerSideBar />
      <div className="pl-48 pr-20">
         <OwnerHeader name="Kitchens" isAdd={true} onAdd={toggleForm} /> {/* 👈 Trigger form */}

        {loading && <p>Loading kitchens...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <OwnerTableComponent
            headers={headers}
            rows={rows}
            isEditable={true}
            
            onEdit={handleEdit}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
        {showForm && <KitchenForm onClick={toggleForm} />} {/* 👈 Show form when triggered */}
    </div>
  );
};

export default OwnerKitchenView;

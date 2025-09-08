// import  InputField,{ OwnerButton } from "./InputField";


// const DiscountForm = ({ formState, handleChange, errors, handleFormSubmit, onClose, isEditing }) => {
//     return (
//         <form onSubmit={handleFormSubmit} className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="p-10 bg-white rounded-lg shadow-lg">
//                 <h2 className="mb-4 text-center font-fredoka">{isEditing ? "Edit Discount" : "Add Discount in Percentage"}</h2>
//                 <InputField
//                     label="Discount Percentage"
//                     name="discountedPercentage"
//                     value={formState.discountedPercentage} 
//                     onChange={handleChange}
//                     error={errors.discountedPercentage}
//                     type="number"
//                     min="0" // Set a minimum value for percentage
//                     max="100" // Use type="number" for percentage input
//                 />
//                 <div className="flex gap-14 mt-14">
//                     <OwnerButton text={isEditing ? "Update Discount" : "Add Discount"} />
//                     <OwnerButton text="Cancel" onClick={onClose} isRed />
//                 </div>
//             </div>
//         </form>
//     );
// };

// export default DiscountForm;


import React from "react";
import InputField, { OwnerButton } from "./InputField";

interface DiscountFormProps {
  formState: {
    discountedPercentage: string;
    start_date: string;
    end_date: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    discountedPercentage?: string;
    startDate?: string;
    endDate?: string;
  };
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  isEditing: boolean;
}

const DiscountForm: React.FC<DiscountFormProps> = ({
  formState,
  handleChange,
  errors,
  handleFormSubmit,
  onClose,
  isEditing,
}) => {
  return (
    <form
      onSubmit={handleFormSubmit}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg text-center font-fredoka">
          {isEditing ? "Edit Discount" : "Add Discount in Percentage"}
        </h2>

        <InputField
          label="Discount Percentage"
          name="discountedPercentage"
          value={formState.discountedPercentage}
          onChange={handleChange}
          error={errors.discountedPercentage}
          type="number"
          min="0"
          max="100"
        />

        <InputField
          label="Start Date"
          name="startDate"
          value={formState.start_date}
          onChange={handleChange}
          error={errors.startDate}
          type="date"
        />

        <InputField
          label="End Date"
          name="endDate"
          value={formState.end_date}
          onChange={handleChange}
          error={errors.endDate}
          type="date"
        />

        <div className="flex justify-center gap-6 mt-10">
          <OwnerButton text={isEditing ? "Update Discount" : "Add Discount"} />
          <OwnerButton text="Cancel" onClick={onClose} isRed />
        </div>
      </div>
    </form>
  );
};

export default DiscountForm;

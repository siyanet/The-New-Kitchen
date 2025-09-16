import { InputField, OwnerButton } from "./InputField";


const DiscountForm = ({ formState, handleChange, errors, handleFormSubmit, onClose, isEditing }) => {
    return (
        <form onSubmit={handleFormSubmit} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-10">
                <h2 className="mb-4 font-fredoka text-center">{isEditing ? "Edit Discount" : "Add Discount in Percentage"}</h2>
                <InputField
                    label="Discount Percentage"
                    name="discountedPercentage"
                    value={formState.discountedPercentage} 
                    onChange={handleChange}
                    error={errors.discountedPercentage}
                    type="number"
                    min="0" // Set a minimum value for percentage
                    max="100" // Use type="number" for percentage input
                />
                <div className="flex gap-14 mt-14">
                    <OwnerButton text={isEditing ? "Update Discount" : "Add Discount"} />
                    <OwnerButton text="Cancel" onClick={onClose} isRed />
                </div>
            </div>
        </form>
    );
};

export default DiscountForm;

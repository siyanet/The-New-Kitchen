import useForm from "../hooks/useForm";
import { InputField, OwnerButton } from "../OwnerComponets/InputField";
import AxiosInstance from "./AxiosInstance";
import { notify } from "./notify";


const PaymentForm = ({order_id,onCancel}) => { 
    const validationRules = {
        first_name: { required: true, minLength: 2 },
        last_name: { required: true, minLength: 2 },
        phone_number: {
          required: true,
          pattern: /^[0-9]{10}$/, // Pattern for a 10-digit phone number
        },
      };
      const { formState, errors, handleChange, validateForm } = useForm(
        { first_name: "", last_name: "", phone_number: "" },
        validationRules
      );
      const handlePaymentSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
          notify("Please correct the errors in the form.", "error");
          return;
            }
            try {
                const response = await AxiosInstance.post(`/transaction/initialize`, {
                  order_id: order_id,
                  ...formState,
                });
          
                const data = response.data;
                if (data.success) {
                  notify("Payment initialized successfully!", "success");
                  window.location.href = data.checkout_url;
                } else {
                  notify("Failed to initialize payment: " + data.message, "error");
                }
              } catch (error) {
                notify("Error initializing payment.", "error");
              } 
        
        
        }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg  px-10 py-5 max-w-md w-full">

      <form onSubmit={handlePaymentSubmit} className="p-5 w-full max-w-md mx-auto">
        <p className="text-center font-fredoka text-xl mb-6"> Payment Initizalization</p>
      <InputField
        label="First Name"
        name="first_name"
        value={formState.first_name}
        onChange={handleChange}
        error={errors.first_name}
      />
      <InputField
        label="Last Name"
        name="last_name"
        value={formState.last_name}
        onChange={handleChange}
        error={errors.last_name}
      />
      <InputField
        label="Phone Number"
        name="phone_number"
        value={formState.phone_number}
        onChange={handleChange}
        error={errors.phone_number}
        type="tel"
      />
      <div className="flex justify-between mt-10">  
      <OwnerButton text="Initialize Payment" type="submit"  isRed/>
      <OwnerButton text="Cancel" onclick={onCancel}/>
        </div>
     
    </form> 



        </div>
        </div>
    
  );
}

export default PaymentForm

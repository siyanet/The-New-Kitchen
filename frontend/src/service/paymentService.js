import AxiosInstance from "../Components/AxiosInstance";

// Function to initialize payment with order details
export const initializePayment = async (orderId) => {
  try {
    const response = await AxiosInstance.post(`/transaction/initialize`, {
      order_id: orderId,
      first_name: "Rediet",
      last_name: "Yilma",
      phone_number: "0975386629",
    });

    const data = response.data;
    if (data.success) {
      // Redirect the user to the checkout URL provided by Chapa
      window.location.href = data.checkout_url;
    } else {
      console.error('Failed to initialize payment:', data.message);
    }
  } catch (error) {
    console.error('Error initializing payment:', error);
  }
};

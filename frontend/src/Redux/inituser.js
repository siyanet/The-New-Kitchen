import store from "./Store";
import { fetchUser } from "./UserSlice";


export const initializeUser = ()=>{
    
    const token = localStorage.getItem("pizzaHutToken");
    if(token){
        store.dispatch(fetchUser());
    }
};
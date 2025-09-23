import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notify } from "../Components/notify";
import { getSubdomainFromPath } from "./utitlites";
import { clearUser } from "../Redux/UserSlice";
import { LogOut } from "lucide-react";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const subdomain = getSubdomainFromPath();
    localStorage.removeItem(`kitchenethio${subdomain}`);

    dispatch(clearUser());
    notify("Logged out successfully", "success");

    navigate(`/thekitchenethio/${subdomain}/AuthPage`);
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 font-semibold text-black transition bg-red-500 rounded font-fredoka hover:bg-red-600"
      >
        <LogOut/>
      </button>
    </div>
  );
};

export default Logout;


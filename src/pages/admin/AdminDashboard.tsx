import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../../reducers/authSlice.ts";

export const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); // This will clear the token and role from Redux and localStorage
        navigate("/login"); // Redirect to login page
    };

    return (
        <>
            <div>
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Log Out </button>
            </div>
        </>
    );
};

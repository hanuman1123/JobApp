import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white shadow-md sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600">ConnectIn</h1>

      <ul className="flex gap-6 text-gray-600">
        <li className="hover:text-blue-600 cursor-pointer">Home</li>
        <li className="hover:text-blue-600 cursor-pointer">Jobs</li>
        <li className="hover:text-blue-600 cursor-pointer">Business</li>
        <li className="hover:text-blue-600 cursor-pointer">About</li>
      </ul>

      <div className="flex items-center gap-4">
        {user && <span className="font-medium">{user.name}</span>}
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

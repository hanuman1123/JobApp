import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

import React from 'react';
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout =() => {
        dispatch(logout());
        navigate("/login")
    }
    return (
        <div className="bg-white shadow-md">
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                <h1 className="text-2xl font-bold text-blue-600">connectIn</h1>
                <ul className="flex space-x-8 text-gray-700 font-medium">
                    <li className="hover:text-blue-600 cursor-pointer">Home</li>
                    <li className="hover:text-blue-600 cursor-pointer">Jobs</li>
                    <li className="hover:text-blue-600 cursor-pointer">Business</li>
                    <li className="hover:text-blue-600 cursor-pointer">About</li>
                </ul>
                <div className="flex items-center space-x-4">
                    {user && <span className="font-semibold text-gray-800">{user.name}</span>}
                    <button
                        onClick={handleLogout}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
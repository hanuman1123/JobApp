import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <aside className="w-64 bg-white shadow-md p-4 h-screen sticky top-0">
      <div className="mb-6 text-center">
        <img
          src={user?.profileImage || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-20 h-20 mx-auto rounded-full border"
        />
        <h2 className="mt-2 font-semibold">{user?.name}</h2>
        <p className="text-sm text-gray-500">{user?.userType}</p>
      </div>

      <ul className="space-y-3 text-gray-700">
        <li className="hover:text-blue-600 cursor-pointer">My Feed</li>
        <li className="hover:text-blue-600 cursor-pointer">Networking</li>
        <li className="hover:text-blue-600 cursor-pointer">Job Portal</li>
        <li className="hover:text-blue-600 cursor-pointer">Chat</li>
        <li className="hover:text-blue-600 cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;

import { useSelector } from 'react-redux';

const Sidebar = () => {
    const {user} = useSelector((state) => state.auth)
    return (
        <aside className="w-64 bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <div className="flex flex-col items-center mb-6">
                <img
                    src={user?.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQt7tMyfoIV_80oLxnHPRRamR8om6XZKkYHWWY02qdOdSZvUk4upL-ysi_bmuAY9vduBA&usqp=CAU"}
                    alt="profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 mb-3"
                />
                <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.userType}</p>
            </div>
            <ul className="w-full space-y-2">
                <li className="px-4 py-2 rounded hover:bg-blue-50 cursor-pointer">My Feed</li>
                <li className="px-4 py-2 rounded hover:bg-blue-50 cursor-pointer">Networking</li>
                <li className="px-4 py-2 rounded hover:bg-blue-50 cursor-pointer">Job Portal</li>
                <li className="px-4 py-2 rounded hover:bg-blue-50 cursor-pointer">Chat</li>
                <li className="px-4 py-2 rounded hover:bg-blue-50 cursor-pointer">Settings</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
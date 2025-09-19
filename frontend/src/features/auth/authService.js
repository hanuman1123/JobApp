import axios from "../../utils/axiosInstance";

// Register user
const register = async (userData) => {
  const res = await axios.post("/auth/register", userData);
  if (res.data && res.data.user && res.data.token) {
    const fullUser = { ...res.data.user, token: res.data.token };
    localStorage.setItem("user", JSON.stringify(fullUser));
    return fullUser;
  }
  return res.data;
};

// Login user
const login = async (userData) => {
  const res = await axios.post("/auth/login", userData);
  if (res.data && res.data.user && res.data.token) {
    const fullUser = { ...res.data.user, token: res.data.token };
    localStorage.setItem("user", JSON.stringify(fullUser));
    return fullUser;
  }
  return res.data;
};

// Get current user profile
const getMe = async (token) => {
  const res = await axios.post(
    "/auth/me",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};

export default { register, login, logout, getMe };

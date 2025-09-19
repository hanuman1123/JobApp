import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // ✅ Import useDispatch
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { getMe } from "../features/auth/authSlice"; // ✅ Import the getMe action (adjust path if needed)

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    skills: "",
    location: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Initialize dispatch

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/auth/me");
        setProfile(res.data);
        setFormData({
          fullName: res.data.fullName || "",
          bio: res.data.bio || "",
          skills: Array.isArray(res.data.skills) ? res.data.skills.join(", ") : "",
          location: res.data.location || "",
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put("/auth/update", {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
      });
      setProfile(res.data);
      dispatch(getMe()); // ✅ Dispatch getMe to update global state
      alert("Profile updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgFormData = new FormData();
    imgFormData.append("profileImage", file);

    try {
      setLoading(true);
      const res = await axios.put("/auth/profile-image", imgFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile(res.data);
      dispatch(getMe()); // ✅ Dispatch getMe to update global state
      alert("Profile image updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload image!");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Profile header */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={
              profile.profileImage && profile.profileImage.startsWith("http")
                ? profile.profileImage
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQt7tMyfoIV_80oLxnHPRRamR8om6XZKkYHWWY02qdOdSZvUk4upL-ysi_bmuAY9vduBA&usqp=CAU"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQt7tMyfoIV_80oLxnHPRRamR8om6XZKkYHWWY02qdOdSZvUk4upL-ysi_bmuAY9vduBA&usqp=CAU";
            }}
          />
          <div>
            <h2 className="text-2xl font-bold">{profile.fullName}</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>

        {/* Upload image */}
        <div className="mb-6">
          <label
            className="block mb-2 font-semibold"
            htmlFor="profileImageInput"
          >
            Change Profile Picture
          </label>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {/* Update form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block mb-1" htmlFor="nameInput">
              Full Name
            </label>
            <input
              id="nameInput"
              type="text"
              name="fullName"
              className="w-full border rounded p-2"
              value={formData.fullName || ""}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block mb-1" htmlFor="bioInput">
              Bio
            </label>
            <textarea
              id="bioInput"
              name="bio"
              className="w-full border rounded p-2 resize-none"
              rows={3}
              value={formData.bio || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1" htmlFor="skillsInput">
              Skills (comma-separated)
            </label>
            <input
              id="skillsInput"
              type="text"
              name="skills"
              className="w-full border rounded p-2"
              value={formData.skills || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1" htmlFor="locationInput">
              Location
            </label>
            <input
              id="locationInput"
              type="text"
              name="location"
              className="w-full border rounded p-2"
              value={formData.location || ""}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
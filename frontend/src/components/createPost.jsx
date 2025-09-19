import { useState } from "react";
import axios from "../utils/axiosInstance";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("GENERAL");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && images.length === 0) {
      return alert("Post cannot be empty!");
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("postType", postType);
    images.forEach((img) => formData.append("postImages", img));

    try {
      setLoading(true);
      const res = await axios.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setContent("");
      setImages([]);
      setPostType("GENERAL");
      if (onPostCreated) onPostCreated(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to create post!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-2 mb-3 resize-none"
          placeholder="What’s on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          className="w-full border rounded p-2 mb-3"
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
        >
          <option value="GENERAL">General</option>
          <option value="ACHIEVEMENT">Achievement</option>
          <option value="BUSINESS_UPDATE">Business Update</option>
          <option value="JOB_POSTING">Job Posting</option>
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="mb-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

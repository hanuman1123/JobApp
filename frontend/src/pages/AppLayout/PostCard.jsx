import { useState } from "react";
import axios from "../../utils/axiosInstance";

const DEFAULT_PROFILE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQt7tMyfoIV_80oLxnHPRRamR8om6XZKkYHWWY02qdOdSZvUk4upL-ysi_bmuAY9vduBA&usqp=CAU";

const PostCard = ({ post, onUpdate }) => {
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Like
  const handleLike = async () => {
    try {
      const res = await axios.post(`/posts/${post._id}/likes`);
      if (onUpdate) onUpdate(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(`/posts/${post._id}/comment`, {
        text: commentText,
      });
      if (onUpdate) onUpdate(res.data);
      setCommentText("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      {/* Post Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.author?.profileImage || DEFAULT_PROFILE}
          alt="author"
          className="w-10 h-10 rounded-full object-cover border"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DEFAULT_PROFILE;
          }}
        />
        <div>
          <h3 className="font-semibold">
            {post.author?.name || post.author?.fullName || "Anonymous"}
          </h3>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="mb-3">{post.content}</p>

      {post.images?.length > 0 && (
        <img
          src={post.images[0]}
          alt="post"
          className="rounded-md mb-3 w-full object-cover"
        />
      )}

      {/* Actions */}
      <div className="flex gap-6 text-gray-600 text-sm mb-3">
        <button onClick={handleLike} className="hover:text-blue-600">
          👍 Like ({post.likes?.length || 0})
        </button>
        <span>💬 {post.comments?.length || 0}</span>
        <span>🔗 {post.shares || 0}</span>
      </div>

      {/* Comments Section */}
      <div className="mt-3">
        {/* Comment Input */}
        <form onSubmit={handleComment} className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 border rounded p-2 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "..." : "Post"}
          </button>
        </form>

        {/* Display Comments */}
        {post.comments?.length > 0 ? (
          post.comments.map((c, i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <img
                src={c.user?.profileImage || DEFAULT_PROFILE}
                alt="comment-user"
                className="w-8 h-8 rounded-full object-cover border"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_PROFILE;
                }}
              />
              <div className="bg-gray-100 rounded px-3 py-1 text-sm">
                <p className="font-semibold">
                  {c.user?.name || c.user?.fullName || "User"}
                </p>
                <p>{c.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostCard;

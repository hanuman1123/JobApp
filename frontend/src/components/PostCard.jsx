const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.author?.profileImage || "https://via.placeholder.com/40"}
          alt="author"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{post.author?.name}</h3>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="mb-3">{post.content}</p>

      {post.images?.length > 0 && (
        <img
          src={post.images[0]}
          alt="post"
          className="rounded-md mb-3 w-full"
        />
      )}

      <div className="flex gap-6 text-gray-600 text-sm">
        <span>👍 {post.likes.length}</span>
        <span>💬 {post.comments.length}</span>
        <span>🔗 {post.shares}</span>
      </div>
    </div>
  );
};

export default PostCard;

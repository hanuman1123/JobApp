

import React from 'react';

const PostCard = ({ post }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-xl mx-auto">
            <div className="flex items-center mb-4">
                <img
                    src={post.author?.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQt7tMyfoIV_80oLxnHPRRamR8om6XZKkYHWWY02qdOdSZvUk4upL-ysi_bmuAY9vduBA&usqp=CAU"}
                    alt="author"
                    className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-blue-200"
                />
                <div>
                    <h3 className="font-semibold text-gray-800">{post.author?.name}</h3>
                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <p className="mb-4 text-gray-700">{post.content}</p>
            {post.images?.length > 0 && (
                <img
                    src={post.images[0]}
                    alt="post"
                    className="w-full max-h-80 object-cover rounded mb-4"
                />
            )}
            <div className="flex space-x-8 text-gray-600 mt-2">
                <span className="flex items-center space-x-1">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 9l-3 3m0 0l-3-3m3 3V4m0 16v-7" /></svg>
                    <span>{post.likes?.length || 0}</span>
                </span>
                <span className="flex items-center space-x-1">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h2" /></svg>
                    <span>{post.comments?.length || 0}</span>
                </span>
                <span className="flex items-center space-x-1">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5V3" /></svg>
                    <span>{post.shares || 0}</span>
                </span>
            </div>
        </div>
    );
};

export default PostCard;
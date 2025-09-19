
import Navbar from './AppLayout/Navbar';
import PostCard from './AppLayout/PostCard';
import Sidebar from './AppLayout/Sidebar';
import CreatePost from '../components/createPost';
import { useEffect, useState } from "react";

import axios from "../utils/axiosInstance";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchFeed = async () => {
    try {
      const res = await axios.get("/posts/feed");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post at top
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <CreatePost onPostCreated={handleNewPost} />
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p className="text-center text-gray-500">No posts available</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;

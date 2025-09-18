import { protect } from "../middlewares/auth.middleware.js"
import { commentPost, deletePost, getFeed, likePost } from "../controllers/post.controller.js"
import { createPost } from './../controllers/post.controller.js';
import upload from "../middlewares/uploadMiddleware.js";
import { express } from 'express';

const router = express.Router
router.get("/feed",protect,getFeed)
router.post("/",protect,upload.array("postImages",5),createPost)
router.post("/postId/likes",protect,likePost)
router.post("/postId/comment",protect,commentPost);
router.delete("/postId",protect,deletePost)

export default router
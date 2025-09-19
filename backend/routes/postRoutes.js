import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { commentPost, deletePost, getFeed, likePost, createPost, updatePost } from "../controllers/post.controller.js";
import upload from "../middlewares/uploadMiddleware.js";


const router = express.Router();   

// routes
router.get("/feed", protect, getFeed);
router.post("/", protect, upload.array("postImages", 5), createPost);
router.post("/:postId/likes", protect, likePost);   
router.post("/:postId/comment", protect, commentPost);
router.delete("/:postId", protect, deletePost);
router.put("/:postId", protect, upload.array("postImages", 5), updatePost);

export default router;

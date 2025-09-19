import express from "express";
import { getMe, login, register, updateProfile, updateProfileImage } from "../controllers/auth.controller.js";
import { protect } from './../middlewares/auth.middleware.js';
import upload from "../middlewares/uploadMiddleware.js";


const router = express.Router();

router.post("/register",upload.single("profileImage"),register);
router.post("/login",login);
router.get("/me",protect,getMe);
router.put("/profile-image", protect, upload.single("profileImage"), updateProfileImage);
router.put("/update", protect, updateProfile);

export default router;
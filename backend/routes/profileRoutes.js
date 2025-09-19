
import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { getProfile, updateProfile, updateProfileImage } from '../controllers/profile.controller.js';
import upload from '../middlewares/uploadMiddleware.js';


const router = express.Router();

router.get("/:userId",protect,getProfile);

router.put("/me",protect,updateProfile),

router.post("/update-image",protect,upload.single("profileImage"),updateProfileImage)


export default router
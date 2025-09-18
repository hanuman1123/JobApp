import express from "express";
import { getMe, login, register } from "../controllers/auth.controller.js";
import { protect } from './../middlewares/auth.middleware.js';
import upload from "../middlewares/uploadMiddleware.js";


const router = express.Router();

router.post("/register",upload.single("profileImage"),register);
router.post("/login",login);
router.post("/me",protect,getMe);

export default router;
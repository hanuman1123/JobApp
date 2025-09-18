
import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { applyBusiness, myApplicationStatus } from '../controllers/business.controller.js';
import { authorizedRoles } from '../middlewares/roleMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post("/submit",protect,upload.array("documents",3),applyBusiness);
router.get("/my-status",protect,myApplicationStatus);

router.post("/applicationId/review",protect,authorizedRoles("ADMIN"),reviewApplication)

export default router;
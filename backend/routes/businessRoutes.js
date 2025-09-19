
import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { applyBusiness, myApplicationStatus, reviewApplication, uploadDocuments } from '../controllers/business.controller.js';
import { authorizedRoles } from '../middlewares/roleMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import { getPendingApplicationAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post("/submit",protect,upload.array("documents",3),applyBusiness);
router.get("/my-status",protect,myApplicationStatus);
router.post("/documents/upload",protect,upload.array("documents",3),uploadDocuments)
router.get("/pending",protect,authorizedRoles("ADMIN"),getPendingApplicationAdmin)
router.post("/applicationId/review",protect,authorizedRoles("ADMIN"),reviewApplication)

export default router;
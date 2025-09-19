
import express  from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { authorizedRoles } from '../middlewares/roleMiddleware.js';
import { approveApplication, getAllUsers, getPendingApplicationAdmin, getStats, rejectApplication, suspendedUser } from '../controllers/adminController.js';

const router = express.Router();

router.get("/applications/pending",protect,authorizedRoles("ADMIN"),getPendingApplicationAdmin);
router.put("/applications/:applicationId/approve",protect,authorizedRoles("ADMIN"),approveApplication);
router.put("/applications/:applicationId/rejected",protect,authorizedRoles("ADMIN"),rejectApplication);
router.get("/users",protect,authorizedRoles("ADMIN"),getAllUsers);
router.put("/users/:userId/suspend",protect,authorizedRoles("ADMIN"),suspendedUser);
router.get(".stats",protect,authorizedRoles("ADMIN"),getStats);

export default router;

import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { myNetwork, sendRequest, updateRequest } from '../controllers/connection.controller.js';

const router = express.Router();

router.post("/request",protect,sendRequest);
router.put("/:connectionId", protect, updateRequest);
router.get("/my-network",protect,myNetwork);

export default  router;
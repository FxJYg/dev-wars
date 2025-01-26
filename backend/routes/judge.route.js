import express from 'express';
import { getCode, trigger } from '../controllers/judge.controllers.js';

const router = express.Router();
router.post("/getCode", getCode);
router.get("/trigger",trigger);

export default router;

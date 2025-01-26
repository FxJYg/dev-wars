import express from 'express';
import {getChallenge, getCode, trigger } from '../controllers/judge.controllers.js';

const router = express.Router();
router.post("/getCode", getCode);
router.get("/trigger",trigger);
router.post("/generate",getChallenge);
export default router;

import express from "express";
import { authToken } from '../middleware/auths.middleware.js';

const router = express.Router();
router.get('/protected', authToken, (req, res) => {
    res.json({message: "You are authorized, you can access this route", user: req.user});
});

export default router;
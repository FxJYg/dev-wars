import express from 'express';
import {resgisterUser, loginUser, logoutUser} from '../controllers/auths.controllers.js';

const router = express.Router();

router.post('/register', resgisterUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);


export default router;
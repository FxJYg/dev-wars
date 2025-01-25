import express from 'express';
import {checkLoggedIn, resgisterUser, loginUser, logoutUser, deleteUser} from '../controllers/auths.controllers.js';

const router = express.Router();

router.post('/register', resgisterUser);

router.post('/login', loginUser);

router.delete('/delete', deleteUser);

router.post('/logout', logoutUser);

router.get('/check', checkLoggedIn);

export default router;
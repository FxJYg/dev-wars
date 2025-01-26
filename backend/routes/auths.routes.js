import express from 'express';
import {checkLoggedIn, registerUser, loginUser, logoutUser, deleteUser} from '../controllers/auths.controllers.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.delete('/delete', deleteUser);

router.post('/logout', logoutUser);

router.get('/check', checkLoggedIn);

export default router;
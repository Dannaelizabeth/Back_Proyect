import express from 'express';

import {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/Users.js';

import { verificationUser, onlyAdmin } from '../middleware/AuthUser.js';


const router = express.Router();

router.get('/users',verificationUser,onlyAdmin, getUser);
router.get('/users/:id', verificationUser,onlyAdmin, getUserById);
router.post('/users',verificationUser,onlyAdmin, createUser);
router.patch('/users/:id', verificationUser, onlyAdmin, updateUser);
router.delete('/users/:id',verificationUser, onlyAdmin, deleteUser);


export default router;
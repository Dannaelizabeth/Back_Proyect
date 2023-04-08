import express from 'express';

import {
    getComponents,
    getComponentsById,
    createComponents,
    updateComponents,
    deleteComponents
} from '../controllers/Components.js';

const router = express.Router();

router.get('/components', getComponents);
router.get('/components/:id', getComponentsById);
router.post('/components', createComponents);
router.patch('/components/:id', updateComponents);
router.delete('/components/:id', deleteComponents);


export default router;
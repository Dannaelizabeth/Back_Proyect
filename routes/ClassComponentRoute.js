import  express  from "express";

import {
    getClassComponents,
    getClassComponentsById,
    createClassComponents,
    updateClassComponents,
    deleteClassComponents
} from '../controllers/ClassComponents.js'

const router = express.Router();

router.get('/classComponents', getClassComponents);
router.get('/classComponents/:id', getClassComponentsById);
router.post('/classComponents', createClassComponents);
router.patch('/classComponents/:id', updateClassComponents);
router.delete('/classComponents/:id', deleteClassComponents);
export default router;
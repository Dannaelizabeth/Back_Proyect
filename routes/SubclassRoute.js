import express from "express";

import{
    getSubclass,
    getSubclassById,
    createSubclass,
    updateSubclass,
    deleteSubclass

} from "../controllers/Subclass.js"

const router = express.Router();

router.get('/subclass', getSubclass);
router.get('/subclass/:id', getSubclassById);
router.post('/subclass', createSubclass);
router.patch('/subclass/:id', updateSubclass);
router.delete('/subclass/:id', deleteSubclass);

export default router;
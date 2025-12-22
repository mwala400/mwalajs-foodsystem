import express from 'express';
import { ensureAuth, ensureAdmin } from '../utils/middleware.js';
import { showManageFoods, addFood, editFood, deleteFoodController, upload, showAddFood } from '../controllers/adminController.js';

const router = express.Router();

router.get('/manage-foods', ensureAuth, ensureAdmin, showManageFoods);
router.get('/add-food', ensureAuth, ensureAdmin, showAddFood);
router.post('/add-food', ensureAuth, ensureAdmin, upload.single('image'), addFood);
router.post('/edit-food/:id', ensureAuth, ensureAdmin, upload.single('image'), editFood);
router.get('/delete-food/:id', ensureAuth, ensureAdmin, deleteFoodController);

export default router;

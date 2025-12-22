import express from 'express';
import { ensureAuth, ensureCustomer } from '../utils/middleware.js';
import { viewFoods } from '../controllers/foodController.js';

const router = express.Router();

router.get('/', ensureAuth, ensureCustomer, viewFoods);

export default router;

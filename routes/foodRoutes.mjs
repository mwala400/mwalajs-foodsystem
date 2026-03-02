import mwalajs from 'mwalajs';
import { ensureAuth, ensureCustomer } from '../utils/middleware.mjs';
import { viewFoods } from '../controllers/foodController.mjs';

const router = mwalajs.Router();

router.get('/', ensureAuth, ensureCustomer, viewFoods);

export default router;

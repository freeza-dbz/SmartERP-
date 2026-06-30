import { Router } from 'express';
import {
  createStockItem,
  getStockItems,
  updateStockItem,
} from '../controllers/stockItem.controller.js';
import verifyJWT from '../middleware/auth.middleware.js';

const router = Router();

// All routes in this file will be protected
router.use(verifyJWT);

router.route('/').post(createStockItem).get(getStockItems);
router.route('/:id').put(updateStockItem);

export default router;
import { Router } from "express"
import {
  createStockGroup,
  getStockGroups,
} from "../controllers/stockGroup.controller.js"

const router = Router();

router.post('/groups', createStockGroup);
router.get('/groups', getStockGroups);

export default router;
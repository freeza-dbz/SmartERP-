import { Router } from "express"
import  {
  createLedger,
  getLedgers,
  updateLedger,
} from "../controllers/ledger.controller.js"

const router = Router();

router.post('/createLedgers', createLedger);
router.get('/fetchLedgers', getLedgers);
router.put('/updateLedgers/:id', updateLedger);

export default router;
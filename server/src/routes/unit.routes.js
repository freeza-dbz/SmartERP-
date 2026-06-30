import { Router } from 'express';
import { createUnit, getUnits } from '../controllers/unit.controller.js';
import verifyJWT from '../middleware/auth.middleware.js';

const router = Router();

// All routes in this file will be protected
router.use(verifyJWT);

router.route('/').post(createUnit).get(getUnits);

export default router;
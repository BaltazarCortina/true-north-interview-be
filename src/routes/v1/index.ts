import { Router } from 'express';

import { checkToken } from '../../middleware/check-token';
import authRoutes from './auth';
import operationsRoutes from './operations';
import recordsRoutes from './records';

const router = Router();

router.use('/auth', authRoutes);

router.use('/operations', operationsRoutes);

router.use('/records', checkToken, recordsRoutes);

export default router;

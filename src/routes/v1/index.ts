import { Router } from 'express';

import operationsRoutes from './operations';
import recordsRoutes from './records';
import { checkToken } from '../../middleware/check-token';

const router = Router();

router.use('/operations', operationsRoutes);

router.use('/records', checkToken, recordsRoutes);

export default router;

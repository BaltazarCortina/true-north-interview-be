import { Router } from 'express';

import operationsRoutes from './operations';
import recordsRoutes from './records';

const router = Router();

router.use('/operations', operationsRoutes);

router.use('/records', recordsRoutes);

export default router;

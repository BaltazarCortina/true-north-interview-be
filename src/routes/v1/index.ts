import { Router } from 'express';

import operationsRoutes from './operations';

const router = Router();

router.use('/operations', operationsRoutes);

export default router;

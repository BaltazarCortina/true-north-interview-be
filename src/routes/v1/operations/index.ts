import { Router } from 'express';

import { getOperations } from './controller';

const router = Router();

router.get('/', getOperations)

export default router;

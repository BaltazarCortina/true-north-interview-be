import { Router } from 'express';

import { getRecords, postRecord } from './controller';

const router = Router();

router.get('/', getRecords);

router.post('/', postRecord);

export default router;

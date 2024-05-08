import { Router } from 'express';

import { getRecords, postRecord } from './controller';

const router = Router();

router.post('/', postRecord);

router.get('/:id', getRecords);

export default router;

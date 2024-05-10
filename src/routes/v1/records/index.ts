import { Router } from 'express';

import { deleteRecord, getRecords, postRecord } from './controller';

const router = Router();

router.get('/', getRecords);

router.post('/', postRecord);

router.patch('/:id', deleteRecord);

export default router;

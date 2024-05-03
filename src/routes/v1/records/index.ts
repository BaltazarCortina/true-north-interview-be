import { Router } from 'express';

import { getRecords, postRecord } from './controller';

const router = Router();

router
  .get('/', getRecords)
  .post('/', postRecord);

export default router;

import { Router } from 'express';

import { getOperations, postOperation } from './controller';

const router = Router();

router
  .get('/', getOperations)
  .post('/', postOperation);

export default router;

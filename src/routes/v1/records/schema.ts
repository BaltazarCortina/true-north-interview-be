import { z } from 'zod';

import { OperationType } from '../../../models/operation';

export const NewRecordBody = z.object({
  type: z.nativeEnum(OperationType),
  userId: z.string(),
  firstNumber: z.number(),
  secondNumber: z.number().optional(),
});

export const GetRecordsPaginatedQuery = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
});

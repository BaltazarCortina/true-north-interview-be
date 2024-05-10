import { z } from 'zod';

import { OperationType } from '../../../models/operation';

export const NewRecordBody = z.object({
  type: z.nativeEnum(OperationType),
  firstNumber: z.number(),
  secondNumber: z.number().optional(),
});

export const GetRecordsPaginatedQuery = z.object({
  page: z.coerce.number().int().positive(),
  limit: z.coerce.number().int().positive(),
  filter: z.nativeEnum(OperationType).or(z.literal('-')),
  search: z.string().optional(),
});

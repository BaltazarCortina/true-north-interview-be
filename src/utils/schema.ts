import { z } from 'zod';

export const IdAsParam = z.object({
  id: z.string(),
});

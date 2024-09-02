import { z } from 'zod';

const registor = z.object({
  name: z.string().nonempty(),
  country: z.string().nonempty(),
  city: z.string().nonempty(),
  subCity: z.string().nonempty(),
  wereda: z.string().nonempty(),
});

const update = z.object({
  name: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  subCity: z.string().optional(),
  wereda: z.string().optional(),
});

export default { registor, update };

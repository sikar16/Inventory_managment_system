import z from "zod";

const supplierSchem = {
  createSupplier: z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(10),
    country: z.string().min(5),
    city: z.string().min(5),
    subCity: z.string().min(3),
    wereda: z.string().min(3),
    categoryId: z.number(),
  }),
  updateSupplier: z.object({
    fullName: z.string().min(3).optional(),
    phone: z.string().min(10).optional(),
    country: z.string().min(5).optional(),
    city: z.string().min(5).optional(),
    subCity: z.string().min(3).optional(),
    wereda: z.string().min(3).optional(),
    categoryId: z.number().optional(),
  }),
};

export default supplierSchem;

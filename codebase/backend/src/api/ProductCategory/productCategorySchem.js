import z from "zod";
const productCategorySchem = {
  create: z.object({
    name: z.string().min(4),
  }),
  update: z.object({
    name: z.string().min(4),
  }),
};
export default productCategorySchem;

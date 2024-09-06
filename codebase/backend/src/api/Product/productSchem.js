import z from "zod";

const productSchema = {
  create: z.object({
    name: z.string().min(4),
    subcategoryId: z.number(),
    items: z.array(
      z.object({
        templateAttributeId: z.number(),
        value: z.string(),
      })
    ),
  }),
  updateProduct: z.object({
    name: z.string().min(4),
    subcategoryId: z.number(),
  }),
  updateProductAttribute: z.object({
    templateAttributeId: z.number(),
    value: z.string(),
  }),
};

export default productSchema;

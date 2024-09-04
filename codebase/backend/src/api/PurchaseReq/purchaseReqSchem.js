import z from "zod";

const purchasedReqSchema = {
  create: z.object({
    userId: z.number(),
    totalPrice: z.string().transform(val => parseFloat(val)), // or z.number() if you handle conversions elsewhere
    items: z.array(
      z.object({
        productId: z.number(),
        quantityToBePurchased: z.number(),
        remark: z.string(),
        unitPrice: z.string().transform(val => parseFloat(val)), // or z.number() if you handle conversions elsewhere
      })
    ),
  }),
  update: z.object({
    userId: z.number(),
    totalPrice: z.string().transform(val => parseFloat(val)), // or z.number() if you handle conversions elsewhere
    items: z.array(
      z.object({
        productId: z.number(),
        quantityToBePurchased: z.number(),
        remark: z.string(),
        unitPrice: z.string().transform(val => parseFloat(val)), // or z.number() if you handle conversions elsewhere
      })
    ),
  }),
};

export default purchasedReqSchema;

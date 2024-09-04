import z from "zod";

const purchasedReqSchema = {
  create: z.object({
    userId: z.number(),
    totalPrice: z.number(),
    items: z.array(
      z.object({
        productId: z.number(),
        quantityToBePurchased: z.number(),
        remark: z.string(),
        unitPrice: z.number(),
      })
    ),
  }),

 
};

export default purchasedReqSchema;

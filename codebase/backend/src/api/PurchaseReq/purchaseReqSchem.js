import z from "zod";

const purchasedReqSchema = {
  create: z.object({
  userId: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),
  items: z.array(
    z.object({
      productId: z.number().nonnegative(),
      purchasedRequestId: z.number().nonnegative(),
      quantityToBePurchased: z.number().positive(),
      remark: z.string().min(1),
      unitPrice: z.number(),
  })
)
}),

updateItems: z.object({
      productId: z.number().nonnegative(),
      purchasedRequestId: z.number().nonnegative(),
      quantityToBePurchased: z.number().positive(),
      remark: z.string().min(1),
      unitPrice: z.number(),
}),
  
};

export default purchasedReqSchema;

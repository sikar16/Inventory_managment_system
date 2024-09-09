import z from "zod";

const purchasedReqSchema = {
  create: z.object({
  totalPrice: z.number().nonnegative(),
  items: z.array(
    z.object({
      productId: z.number().nonnegative(),
      quantityToBePurchased: z.number().positive(),
      remark: z.string().min(1),
      unitPrice: z.number(),
  })
)
}),
updateItems: z.object({
      productId: z.number().nonnegative(),
      quantityToBePurchased: z.number().positive(),
      remark: z.string().min(1),
      unitPrice: z.number(),
}),
updateFinace: z.object({
     financeId:z.number().nonnegative()
}),
updateGm: z.object({
     gmid:z.number().nonnegative()
}),
approvePurchasedReqFinace:z.object({
  isApproviedByGM:z.boolean(),
}),
approvePurchasedReqGm:z.object({
  isApproviedByFinance:z.boolean(),
})
};

export default purchasedReqSchema;

import z from "zod";

const purchasedReqSchema = {
  create: z.object({
    totalPrice: z.number().nonnegative(),
    items: z.array(
      z.object({
        productId: z.number().nonnegative(),
        quantityToBePurchased: z.number().positive(),
        unitPrice: z.number().nonnegative(),
        remark: z.string().min(1).optional(),
      })
    ),
  }),

  updateItems: z.object({
    purchasedRequestId: z.number().nonnegative(),
    productId: z.number().nonnegative(),
    quantityToBePurchased: z.number().positive(),
    remark: z.string().min(1),
    unitPrice: z.number().nonnegative(),
  }),

  updateFinance: z.object({
    isApproviedByFinance: z.boolean(),
  }),

  updateGM: z.object({
    gmid: z.number().nonnegative(),
    isApproviedByGM: z.boolean(),
  }),

  approvePurchasedReqFinance: z.object({
    isApproviedByFinance: z.boolean(),
  }),

  approvePurchasedReqGM: z.object({
    isApproviedByGM: z.boolean(),
  }),
};

export default purchasedReqSchema;

// import z from "zod";

// const purchasedReqSchema = {
//   create: z.object({
//   totalPrice: z.number().nonnegative(),
//   items: z.array(
//     z.object({
//       purchasedRequestId:z.number(),
//       productId: z.number().nonnegative(),
//       quantityToBePurchased: z.number().positive(),
//       remark: z.string().min(1),
//       unitPrice: z.number(),
//   })
// )
// }),
// updateItems: z.object({
//       productId: z.number().nonnegative(),
//       quantityToBePurchased: z.number().positive(),
//       remark: z.string().min(1),
//       unitPrice: z.number(),
// }),
// updateFinace: z.object({
//     //  financeId:z.number().nonnegative()
// }),
// updateGm: z.object({
//      gmid:z.number().nonnegative()
// }),
// approvePurchasedReqFinace:z.object({
//   isApproviedByFinance:z.boolean(),
// }),
// approvePurchasedReqGm:z.object({
//   isApproviedByGM:z.boolean(),

// })
// };

// export default purchasedReqSchema;

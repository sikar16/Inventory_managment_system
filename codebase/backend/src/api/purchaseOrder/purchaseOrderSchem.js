import z from 'zod'

const purchaseOrderSchema={
    create:z.object({
        userId: z.number().nonnegative(),
        items: z.array(
            z.object({
              productId: z.number().nonnegative(),
              purchasOrderId: z.number().nonnegative(),
              quantityToBePurchased: z.number().positive(),
              remark: z.string().min(1),
          })
        )
    }),

    updateItem:z.object({
              productId: z.number().nonnegative(),
              purchasOrderId: z.number().nonnegative(),
              quantityToBePurchased: z.number().positive(),
              remark: z.string().min(1),
              
    })
}

export default purchaseOrderSchema;
import z from 'zod'

const purchaseOrderSchema={
    create:z.object({
        items: z.array(
            z.object({
              productId: z.number(),
              quantityToBePurchased: z.number().positive(),
              remark: z.string().min(1),
              purchasedRequestId:z.number()
          })
        )
    }),
    updateItem:z.object({
              productId: z.number(),
              quantityToBePurchased: z.number(),
              remark: z.string().min(1), 
              purchasedRequestId:z.number()             
    }),
    updateSupplier:z.object({
              suppliersId: z.number(),          
    }),
    updateWinner:z.object({
              winnerId: z.number(),             
    }),
    updateWinner:z.object({
              winnerId: z.number(),             
    }),
    
}

export default purchaseOrderSchema;
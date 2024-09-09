import z from 'zod'

const purchaseOrderSchema={
    create:z.object({
        items: z.array(
            z.object({
              productId: z.number().nonnegative(),
              quantityToBePurchased: z.number().positive(),
              remark: z.string().min(1),
          })
        )
    }),
    updateItem:z.object({
              productId: z.number().nonnegative(),
              quantityToBePurchased: z.number().positive(),
              remark: z.string().min(1),              
    }),
    updateSupplier:z.object({
              suppliersId: z.number().nonnegative(),          
    }),
    updateWinner:z.object({
              winnerId: z.number().nonnegative(),             
    }),
   
    
}

export default purchaseOrderSchema;
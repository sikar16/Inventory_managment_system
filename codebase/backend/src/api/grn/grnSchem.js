import z from 'zod'
const grnSchem={
    create:z.object({
        reciverId:z.number(),
        supplayerId:z.number(),
        purchasedOrderId:z.number(),
        grnItem:z.array(
            z.object({
                productId:z.number(),
                quantity:z.number(),
                remark:z.string().min(1)
            })
        )
    }),

    updateitems:z.object({
        productId:z.number(),
        quantity:z.number(),
        remark:z.string().min(1)
    })
}

export default grnSchem
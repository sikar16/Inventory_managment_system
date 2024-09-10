import z from "zod"

const supplierOfferSchem={
    create:z.object({
        supplayerId:z.number(),
        totalPrice:z.number(),
        items:z.array(
            z.object({
                productId:z.number(),
                quantity:z.number(),
                unitPrice:z.number()
            })
        )
    }),
    updateSupplier:z.object({
        supplayerId:z.number(),
    }),
    updatesupplierOfferItems:z.object({
        productId:z.number(),
        quantity:z.number(),
        unitPrice:z.number()
    }),
    updatesupplierOffer:z.object({
        totalPrice:z.number(),
    }),

}


export default supplierOfferSchem
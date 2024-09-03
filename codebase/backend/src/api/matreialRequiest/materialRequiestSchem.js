import z from "zod"
import productSchema from "../Product/productSchem";

const materialRequiestSchem={
    create:z.object({
    requesterId: z.string().int(),
    departmentHeadId: z.string().int(),
    items:z.array(
      z.object({
        productId:z.string(),
        quantityRequested:z.number(),
        remark:z.string()
      })
    )
    }),
    
    update:z.object({
    requesterId: z.string().int(),
    departmentHeadId: z.string().int(),
    items:z.array(
      z.object({
        productId:z.string(),
        quantityRequested:z.number(),
        remark:z.string()
      })
    )
    })
}


export default materialRequiestSchem



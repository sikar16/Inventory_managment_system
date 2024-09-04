import z from "zod"

const materialRequiestSchem={
    create:z.object({
    requesterId: z.number(),
    departmentHeadId: z.number(),
    items:z.array(
      z.object({
        productId:z.number(),
        quantityRequested:z.number(),
        remark:z.string()
      })
    )
    }),
    
    update:z.object({
    requesterId: z.number(),
    departmentHeadId: z.number(),
    items:z.array(
      z.object({
        productId:z.number(),
        quantityRequested:z.number(),
        remark:z.string()
      })
    )
    })
}


export default materialRequiestSchem



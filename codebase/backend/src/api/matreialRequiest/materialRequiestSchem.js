import z from "zod";

const materialRequiestSchem = {
  create: z.object({
    requesterId: z.number(),
    departmentHeadId: z.number(),
    items: z.array(
      z.object({
        productId: z.number(),
        quantityRequested: z.number(),
        remark: z.string(),
      })
    ),
  }),
 
  updateDepartmentHead: z.object({
    requesterId: z.number(),
    departmentHeadId: z.number(),
  }),

  updateMeterialReqItem: z.object({
    productId: z.number(),
    quantityRequested: z.number(),
    remark: z.string(),
  }),
};

export default materialRequiestSchem;

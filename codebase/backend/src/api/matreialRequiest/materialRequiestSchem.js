import z from "zod";

const materialRequestSachem = {
  create: z.object({
    items: z.array(
      z.object({
        productId: z.number(),
        quantityRequested: z.number(),
        remark: z.string(),
      })
    ),
  }),

  updateDepartmentHead: z.object({
    departmentHeadId: z.number(),
  }),

  updateMeterialReqItem: z.object({
    productId: z.number(),
    quantityRequested: z.number(),
    remark: z.string(),
  }),
  approveMeterialReqItem: z.object({
    isApproviedByDH: z.boolean(),
  }),
};

export default materialRequestSachem;

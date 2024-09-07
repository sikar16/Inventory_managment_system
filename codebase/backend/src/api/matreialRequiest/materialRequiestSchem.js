import z from "zod";

const materialRequiestSchem = {
  create: z.object({
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
    departmentHeadId: z.number(),
  }),

  updateMeterialReqItem: z.object({
    productId: z.number(),
    quantityRequested: z.number(),
    remark: z.string(),
  }),
  approveMeterialReqItem: z.object({
    isApproviedByDH: z.boolean(),
    logisticSuperViserId: z.number(),
  }),
};

export default materialRequiestSchem;

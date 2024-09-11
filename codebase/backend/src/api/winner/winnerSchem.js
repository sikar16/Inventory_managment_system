import z from "zod";
const winnerSchem = {
  create: z.object({
    supplayerId:z.number(),  
    purchasedOrderId :z.number()
  }),
  updatesupplier: z.object({
    supplayerId:z.number(),  
  }),
  updatepurchasedorder: z.object({
    purchasedOrderId :z.number()
  }),
 
};
export default winnerSchem;

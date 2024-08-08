import z from "zod";

const departmentSchema = {
  create: z.object({
    name: z.string().min(3),
  }),

  update: z.object({
    name: z.string().min(3),
  }),
};

export default departmentSchema;

import z from "zod";

const departmentSchema = {
  createDepartment: z.object({
    name: z.string().min(3),
  }),

  updateDepartment: z.object({
    name: z.string().min(3),
  }),
};

export default departmentSchema;

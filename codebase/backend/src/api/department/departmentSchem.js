import z from "zod";

const departmentSchema = {
  createDepartment: z.object({
    name: z.string().min(5),
  }),

  updateDepartment: z.object({
    name: z.string().min(5),
  }),
};

export default departmentSchema;

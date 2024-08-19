import z from "zod";

const templateSchema = {
  create: z.object({
    name: z.string().min(4),
    attributes: z.array(
      z.object({
        name: z.string().min(1),
        dataType: z.enum(["STRING", "DOUBLE", "INT", "DATE_TIME"])
      })
    )
  }),
  updateTemplate: z.object({
    name: z.string().min(4),
  }),
  updateTemplateAttribute: z.object({
    attributes: z.array(
      z.object({
        name: z.string().min(1),
        dataType: z.enum(["STRING", "DOUBLE", "INT", "DATE_TIME"])
      })
    )
  })
};

export default templateSchema;

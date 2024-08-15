import z from "zod";

const attributeSchema = z.object({
    name: z.string().min(1),
    dataType: z.enum(["STRING", "DOUBLE", "INT","DATE_TIME"])
});

const templeteSchem = {
    create: z.object({
        name: z.string().min(4),
        attributes: z.array(attributeSchema) 
    }),
    update: z.object({
        name: z.string().min(4),
        attributes: z.array(attributeSchema).optional() 
    })
};

export default templeteSchem;
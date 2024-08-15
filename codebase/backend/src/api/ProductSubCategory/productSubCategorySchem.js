import z from "zod"
const productSubCategorySchem={
    create:z.object({
        name:z.string().min(5),
        categoryId: z.number().int().positive()

    }),
    update:z.object({
        name:z.string().min(5),
        categoryId: z.number().int().positive()

    })
}

export default productSubCategorySchem
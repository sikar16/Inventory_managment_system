import z from "zod"

const supplierSchem={
    createSupplier:z.object({
        fullName:z.string().min(3),
        email:z.string().email(),
        phone:z.string().min(10),
        country:z.string().min(5),
        city:z.string().min(5),
        subCity:z.string().min(5),
    }),
    updateSupplier:z.object({
        fullname:z.string().min(3),
        email:z.string().email(),
        phone:z.string().min(10),
        country:z.string().min(5),
        city:z.string().min(5),
        subCity:z.string().min(5),
    })
}

export default supplierSchem
import z from "zod"
const storeSchem={
registor:z.object({
    name:z.string().min(3),
    country:z.string().min(5),
    city:z.string().min(5),
    subCity:z.string().min(3),
}),
update:z.object({
    name:z.string().min(3),
    country:z.string().min(5),
    city:z.string().min(5),
    subCity:z.string().min(5),
})
}

export default storeSchem;
import z from "zod"
const userSchem={
    register:z.object({
        email:z.string().email(),
        password:z.string().min(6),
        firstName:z.string().min(3),
        middleName:z.string().min(3),
        lastName:z.string().min(3),
    }),

    login:z.object({
        password:z.string().min(6),
        email:z.string().email()
    }),

    update:z.object({
        email:z.string().email(),
        password:z.string().min(6),
        firstName:z.string().min(3),
        middleName:z.string().min(3),
        lastName:z.string().min(3),
    }),

    changePassword: z.object({
        oldPassword: z.string().min(6),
        newPassword: z.string().min(6),
        id: z.number().min(1),
      }),
}

export default userSchem;
import z from "zod";
const userSchem = {
  register: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(3),
    middleName: z.string().min(3),
    lastName: z.string().min(3),
    gender: z.enum(["MALE", "FEMALE"]),
    phone: z.string().min(10).max(14),
    country: z.string(),
    city: z.string(),
    subCity: z.string(),
    // role: z.enum([
    //   "ADMIN",
    //   "EMPLOYEE",
    //   "DEPARTMENT_HEAD",
    //   "LOGESTIC_SUPERVISER",
    //   "FINANCE",
    //   "GENERAL_MANAGER",
    //   "STORE_KEEPER",
    // ]), 
    departmentId: z.number(),
    password: z.string().optional(), 
  }),

  login: z.object({
    password: z.string().min(6),
    email: z.string().email(),
  }),

  updateProfile: z.object({
    firstName: z.string().min(3),
    middleName: z.string().min(3),
    lastName: z.string().min(3),
    gender: z.enum(["MALE", "FEMALE"]),
    country: z.string(),
    city: z.string(),
    subcity: z.string(),
    departmentId: z.number(),
  }),

  changePhone: z.object({
    phone: z.string().min(10).max(14),
  }),
  changeEmail: z.object({
    email: z.string().email(),
  }),

  changePassword: z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  }),
};

export default userSchem;

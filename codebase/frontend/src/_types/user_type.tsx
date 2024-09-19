import { DepartmentType } from "./department_type";
import { ProfileType } from "./profile_type";

export interface UserType {
  id: number;
  email: string;
  activeStatus: "ACTIVE" | "INACTIVE"; // Adjust status enum as needed
  role: "DEPARTMENT_HEAD" | "EMPLOYEE" | "MANAGER"; // Adjust role enum as needed
  createdAt: string;
  departmentId: number;
  profile: ProfileType;
  department: DepartmentType;
  password: string
}
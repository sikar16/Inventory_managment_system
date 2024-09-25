import { DepartmentType } from "./department_type";
import { ProfileType } from "./profile_type";

export interface UserType {
  id: number;
  email: string;
  activeStatus: "ACTIVE" | "INACTIVE" | "BLOCKED";
  role:
    | "DEPARTMENT_HEAD"
    | "EMPLOYEE"
    | "ADMIN"
    | "LOGESTIC_SUPERVISER"
    | "FINANCE"
    | "GENERAL_MANAGER"
    | "STORE_KEEPER";

  createdAt: string;
  departmentId: number;
  profile: ProfileType;
  department: DepartmentType;
  password: string;
}
export interface MeUserType {
  id: number;
  email: string;
  activeStatus: "ACTIVE" | "INACTIVE" | "BLOCKED";
  role:
    | "DEPARTMENT_HEAD"
    | "EMPLOYEE"
    | "ADMIN"
    | "LOGISTIC_SUPERVISOR" // corrected spelling
    | "FINANCE"
    | "GENERAL_MANAGER"
    | "STORE_KEEPER";

  createdAt: string;
  departmentId: number;
  profile: ProfileType;
  department: DepartmentType;
}

export interface AddressType {
  id: number;
  country: string;
  city: string;
  subCity: string;
  wereda: string;
  createdAt: string;
}

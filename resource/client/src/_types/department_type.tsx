import { UserType } from "./user_type";

export interface DepartmentType {
  id: number;
  name: string;
  createdAt: string;
  _count: {
    users: UserType;
  }
}


export interface CompanyRoleType {
  ADMIN: 'ADMIN';
  EMPLOYEE: 'EMPLOYEE';
  DEPARTMENT_HEAD: 'DEPARTMENT_HEAD';
  LOGISTIC_SUPERVISOR: 'LOGISTIC_SUPERVISOR';
  FINANCE: 'FINANCE';
  GENERAL_MANAGER: 'GENERAL_MANAGER';
  STORE_KEEPER: 'STORE_KEEPER';
}

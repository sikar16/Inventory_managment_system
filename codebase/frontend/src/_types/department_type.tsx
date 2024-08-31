export interface DepartmentType {
  id: number;
  name: string;
  createdAt: string;
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

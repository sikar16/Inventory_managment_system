
// Updated MaterialRequest Interface
export interface MaterialRequest_type {
    id: number;
    requesterId: number;
    departmentHeadId: number | null;
    logisticSuperViserId: number | null;
    createdAt: string;
    isApproviedByDH: boolean;
    items: MaterialRequestItem[];
    employee: Employee;
    logisticSupervisor: LogisticSupervisor | null;
    departmentHead: DepartmentHead | null;
    _count: {
        items: number;
    };
}

// MaterialRequestItem Interface
export interface MaterialRequestItem {
    id: number;
    materialRequestId: number;
    productId: number;
    quantityRequested: string;
    quantityInStock: number | null;
    quantityToBePurchased: number | null;
    remark: string;
    _count: {
        productAttributes: number;
    };
    product: Product;
}

// Updated Product Interface
export interface Product {
    id: number;
    subcategoryId: number;
    name: string;
    createdAt: string;
    subcategory: Subcategory;
    productAttributes: ProductAttribute[];
}

// Subcategory Interface
export interface Subcategory {
    id: number;
    categoryId: number;
    name: string;
    createdAt: string;
    category: Category;
}

// Category Interface
export interface Category {
    id: number;
    name: string;
    createdAt: string;
}

// ProductAttribute Interface
export interface ProductAttribute {
    id: number;
    productId: number;
    templateAttributeId: number;
    value: string;
    templateAttribute: TemplateAttribute;
}

// TemplateAttribute Interface
export interface TemplateAttribute {
    id: number;
    templateId: number;
    name: string;
    dataType: string;
}

// Employee Interface
export interface Employee {
    id: number;
    email: string;
    activeStatus: string;
    role: string;
    createdAt: string;
    departmentId: number;
    profile: Profile;
    department: Department;
}

// LogisticSupervisor Interface
export interface LogisticSupervisor {
    id: number;
    email: string;
    activeStatus: string;
    role: string;
    createdAt: string;
    departmentId: number;
    profile: Profile;
    department: Department;
}

// DepartmentHead Interface
export interface DepartmentHead {
    id: number;
    email: string;
    activeStatus: string;
    role: string;
    createdAt: string;
    departmentId: number;
    profile: Profile;
    department: Department;
}

// Profile Interface
export interface Profile {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    middleName: string;
    gender: string;
    phone: string;
    imgUrl: string | null;
    addressId: number;
}

// Department Interface
export interface Department {
    id: number;
    name: string;
    createdAt: string;
}

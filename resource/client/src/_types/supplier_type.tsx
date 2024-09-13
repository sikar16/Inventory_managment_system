import { AddressType } from "./address_type";
import { supplierCategoryType } from "./supplierCategory_type";

export interface SupplierType {
    id: number;
    categoryId: number;
    fullName: string;
    phone: string;
    email: string;
    addressId: number;
    createdAt: Date;
    category: supplierCategoryType;
    address: AddressType;
}
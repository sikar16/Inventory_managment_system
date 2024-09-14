import { AddressType } from "./address_type";
import { SupplierCategoryType } from "./supplierCategory_type";

export interface SupplierType {
    id: number;
    categoryId: number;
    fullName: string;
    phone: string;
    email: string;
    addressId: number;
    createdAt: Date;
    category: SupplierCategoryType;
    address: AddressType;
}
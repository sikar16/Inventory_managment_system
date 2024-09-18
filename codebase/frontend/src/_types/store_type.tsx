import { AddressType } from "./address_type";
import { ProductType } from "./product_type";
import { UserType } from "./user_type";

export enum StoreInventoryActionType {
    IN = "IN",
    OUT = "OUT",
    TRANSFER = "TRANSFER",
}

// Interface for the Store model
export interface StoreType {
    id: number;
    name: string;
    addressId: number;
    createdAt: Date;
    address: AddressType;
    storeInventory: StoreInventoryRecordType[];
    attributes: unknown;

}

export interface StoreInventoryRecordType {
    id: number;
    storId: number;
    userId: number;
    productId: number;
    quantity: number;
    currentQuantity: number;
    type: StoreInventoryActionType;
    createdAt: Date;
    product: ProductType;
    user: UserType;
    store: StoreType;
}

export interface StoreType {
    id: number;
    name: string;
    addressId: number;
}

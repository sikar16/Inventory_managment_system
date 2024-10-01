import { ProductType } from "./product_type";
import { UserType } from "./user_type";

export interface PurchasedOrderType {
    id: number;
    userId: number;
    createdAt: Date;
    user: UserType;
    items: PurchasedOrderItem[];
}

export interface PurchasedOrderItem {
    id: number;
    purchasOrderId: number;
    productId: number;
    quantityToBePurchased: number;
    remark: string;
    purchasedRequest: PurchasedOrderType;
    products: ProductType[];
}
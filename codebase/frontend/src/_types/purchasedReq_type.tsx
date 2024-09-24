import { ProductType } from "./product_type";
import { UserType } from "./user_type";

export interface PurchasedRequest_type {
    id: number;
    userId: number;
    createdAt: Date;
    isApproviedByGM: boolean;
    isApproviedByFinance: boolean;
    totalPrice: number;
    user: UserType;
    items: PurceasedRequestedItem_type[];
}

export interface PurceasedRequestedItem_type {
    id: number;
    productId: number;
    purchasedRequestId: number;
    quantityToBePurchased: number;
    remark: string;
    unitPrice: number;
    purchasedRequest: PurchasedRequest_type;
    products: ProductType[];
}

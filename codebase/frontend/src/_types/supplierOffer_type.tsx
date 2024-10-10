import { ProductType } from "./product_type";
import { PurchasedOrderType } from "./purchasedOrder_type";
import { SupplierType } from "./supplier_type";

export interface SupplierOfferItem {
    productId: ProductType;
    quantity: number;
    unitPrice: number;
}

// Main interface for Supplier Offer
export interface SupplierOffer {
    purchasedOrderId: PurchasedOrderType;
    supplayerId: SupplierType;
    totalPrice: number;
    items: SupplierOfferItem[];
}
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

export type PurchaseDetailType = {
  id: number;
  userId: number;
  createdAt: string; // ISO date string
  isApproviedByGM: boolean;
  isApproviedByFinance: boolean;
  totalPrice: string;
  items: {
    id: number;
    productId: number;
    purchasedRequestId: number;
    quantityToBePurchased: string;
    remark: string;
    unitPrice: string;
    products: {
      id: number;
      subcategoryId: number;
      name: string;
      createdAt: string; // ISO date string
      subcategory: {
        id: number;
        categoryId: number;
        name: string;
        createdAt: string; // ISO date string
        category: {
          id: number;
          name: string;
          createdAt: string; // ISO date string
        };
      };
      productAttributes: {
        id: number;
        productId: number;
        templateAttributeId: number;
        value: string;
        templateAttribute: {
          id: number;
          templateId: number;
          name: string;
          dataType: string;
        };
      }[];
    };
  }[];
};

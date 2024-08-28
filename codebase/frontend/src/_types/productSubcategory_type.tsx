import { ProductCategoryType } from "./productCategory_type";

export interface ProductSubCategoryType {
    id: number;
    categoryId: number;
    name: string;
    createdAt: Date;
    category: ProductCategoryType;
}

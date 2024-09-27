import { ProductCategoryType } from "./productCategory_type";
import { ProductSubCategoryType } from "./productSubcategory_type";
import { ProductAttributeType, TemplateAttributeType } from "./template_type";

export interface ProductType {
  id: number;
  subcategoryId: number;
  templateId: number;
  name: string;
  createdAt: Date;
  category: ProductCategoryType;
  subcategory: ProductSubCategoryType;
  productAttributes: ProductAttributeType[];
  templateAttributeType: TemplateAttributeType[];
}

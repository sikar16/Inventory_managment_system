import { ProductCategoryType } from "./productCategory_type";
import { ProductSubCategoryType } from "./productSubcategory_type";

export enum AttributeDataType {
  STRING = "STRING",
  DATE_TIME = "DATE_TIME",
  DOUBLE = "DOUBLE",
  INT = "INT",
}

// Template Attribute Type
export interface TemplateAttributeType {
  id: number;
  templateId: number;
  name: string;
  dataType: string;
}

// Template Type
export interface TemplateType {
  id: number;
  name: string;
  createdAt: Date;
  attributes: TemplateAttributeType[];
  categoryId: ProductCategoryType;
  subCategoryId: ProductSubCategoryType;
}

// Product Attribute Type
export interface ProductAttributeType {
  id: number;
  productId: number;
  templateAttributeId: number;
  value: string;
  templateAttribute: TemplateAttributeType;
}

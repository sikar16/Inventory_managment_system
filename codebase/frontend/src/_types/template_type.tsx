import { ProductCategoryType } from "./productCategory_type";
import { ProductSubCategoryType } from "./productSubcategory_type";

export enum AtributeDateType {
  STRING = "STRING",
  DATE_TIME = "DATE_TIME",
  DOUBLE = "DOUBLE",
  INT = "INT",
}

export interface TemplateAttributeType {
  id: number;
  templateId: number;
  name: string;
  dataType: string;
}

export interface TemplateType {
  id: number;
  name: string;
  createdAt: Date;
  attributes: TemplateAttributeType[];
  categoryId: ProductCategoryType;
  subCategoryId: ProductSubCategoryType
}

export interface ProductAttributeType {
  id: number;
  productId: number;
  templateAttributeId: number;
  value: string;
  templateAttribute: TemplateAttributeType;
}

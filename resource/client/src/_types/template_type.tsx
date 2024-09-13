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
}

export interface ProductAttributeType {
  id: number;
  productId: number;
  templateAttributeId: number;
  value: string;
  templateAttribute: TemplateAttributeType;
}

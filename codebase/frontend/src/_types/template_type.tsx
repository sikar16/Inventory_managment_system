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
    dataType: AtributeDateType;
    template: TemplateType;
    productAttribute: ProductAttributeType[];
}

export interface TemplateType {
    id: number;
    name: string;
    createdAt: Date;
    attributes: TemplateAttributeType[];
}

export interface ProductAttributeType {
    id: number;
    attributeName: string;
    attributeValue: string;
    templateAttributeId: number;
}

import { ProductType } from "./product_type";
import { UserType } from "./user_type";

export interface MaterialRequestType {
    userId: UserType;
    departmentHeadId: number;
    items: {
        productId: ProductType;
        quantityRequested: number;
        remark: string;
    }[];
    // userType: UserType;
}

import { UserType } from "./user_type";

export interface MaterialRequestType {
    userId: number,
    departmentHeadId: number;
    items: {
        productId: number;
        quantityRequested: number;
        remark: string;
    }[];
    userType: UserType

}
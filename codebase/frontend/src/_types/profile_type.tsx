import { AddressType } from "./address_type";

export interface ProfileType {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: "FEMALE" | "MALE"; // Adjust the gender enum as needed
  phone: string;
  imgUrl: string | null;
  addressId: number;
  address: AddressType;
}

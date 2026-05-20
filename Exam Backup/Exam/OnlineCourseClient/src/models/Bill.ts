import { UserDetails } from "./UserDetails";

export interface Bill {

  BillID: number;

  UserID: number;

  User?: UserDetails;
}
import { UserDetails } from "./UserDetails";

import { ProductTable } from "./ProductTable";

export interface Cart {

  CartID?: number;

  UserID: number;

  ProdID: number;

  CartQty: number;

  Price: number;

  User?: UserDetails;

  Product?: ProductTable;
}
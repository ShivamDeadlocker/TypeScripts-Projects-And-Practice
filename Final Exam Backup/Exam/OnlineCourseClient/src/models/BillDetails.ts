import { Bill } from "./Bill";

import { ProductTable } from "./ProductTable";

export interface BillDetails {

  BillDetailsID: number;

  BillID: number;

  ProdID: number;

  BillQty: number;

  BillAmt: number;

  Bill?: Bill;

  Product?: ProductTable;
}
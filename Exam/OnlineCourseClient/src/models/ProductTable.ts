import { Category } from "./Category";

export interface ProductTable {

  ProdID: number;

  ProdName: string;

  ProdPrice: number;

  ProdImg: string;

  ProdDsc: string;

  ProdQty: number;

  categoryId: number;

  Category?: Category;
}
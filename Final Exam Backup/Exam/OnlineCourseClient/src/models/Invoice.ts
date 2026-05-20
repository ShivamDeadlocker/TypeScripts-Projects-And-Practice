export interface Invoice {
  Message?: string;

  IsPurchase?: boolean;

  BillId?: number;

  UserId?: number;

  TotalAmount?: number;
}

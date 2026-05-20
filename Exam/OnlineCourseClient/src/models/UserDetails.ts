import { UserType } from "./UserType";

export interface UserDetails {
  UserID: number;

  UserName: string;

  UserEmail: string;

  UserPassword: string;

  UserConfirmPassword: string;

  TypeId: number;

  UserType?: UserType;
}
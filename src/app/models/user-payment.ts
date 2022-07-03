import {UserBilling} from "./user-billing";

export interface UserPayment {
  id: number;
  type: string;
  cardName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: number;
  holderName: string;
  defaultPayment: boolean;
  userBilling: UserBilling;
}

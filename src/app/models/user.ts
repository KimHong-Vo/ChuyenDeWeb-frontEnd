import {UserPayment} from "./user-payment";
import {UserShipping} from "./user-shipping";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string
  phone: string;
  enabled: boolean;
  userPayments: UserPayment[];
  userShippingList: UserShipping[];
}

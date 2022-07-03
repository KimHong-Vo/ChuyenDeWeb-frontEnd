import {UserPayment} from "./user-payment";
import {UserShipping} from "./user-shipping";

export interface User {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  enabled: boolean;
  // userPayments: UserPayment[];
  // userShippingList: UserShipping[];
}

import {User} from './user';

export interface ShoppingCart {
  id: number;
  grandTotal: number;
  user: User;
}

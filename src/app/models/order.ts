import {CartItem} from "./cart-item";

export interface Order {
  id: number;
  orderDate: string;
  shippingDate: string;
  shippingMethod: string;
  orderStatus: string;
  orderTotal: number;
  cartItemList: CartItem[];
}

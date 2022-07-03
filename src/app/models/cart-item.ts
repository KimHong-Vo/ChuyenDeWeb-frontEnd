import { Book } from './book';
import { ShoppingCart } from './shopping-cart';

export interface CartItem {
  id: number;
  subtotal: number;
  qty: number;
  book: Book;
  // shoppingCart: ShoppingCart
  toUpdate: boolean;
}

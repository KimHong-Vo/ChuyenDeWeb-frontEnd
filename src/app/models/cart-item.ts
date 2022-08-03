import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Book } from './book';
import { ShoppingCart } from './shopping-cart';

export class CartItem {
  id: number=0;
  subtotal: number=0;
  quantities: number=0;
  book: Book=new Book();
  // shoppingCart: ShoppingCart
  toUpdate: boolean=false;
}

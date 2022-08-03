import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  emptyCart: boolean = false;
  item_qty: number = 0;
  min=1;
  idUser: string = '';
  c: Cart = new Cart();
  cartItem: CartItem[] = [];
  totalPriceOfCart: number = 0;
  constructor(
    private userSerice: UserService,
    private cart: CartService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      if (this.userSerice) {
        // this.idUser= params['id'];
        // this.cart.loadCart(this.idUser).subscribe((respone:Cart)=>{
        // this.c= respone;
        this.cart.loadCart().subscribe(
          (respone: Cart) => {
            this.c = respone;
            this.cartItem = this.c.cartItem;
            for (let currentCartItem of this.cartItem) {
              this.totalPriceOfCart +=
                currentCartItem.quantities * currentCartItem.book.ourPrice;
            }
          },
          (error: HttpErrorResponse) => {
            alert('Loi dong 27');
          }
        );
      } else {
        alert('You are not login');
      }
    });
  }
  incrementQty() {
    this.item_qty += 1;
    console.log(this.item_qty + 1);
  }

  //decrements item

  decrementQty() {
    if (this.item_qty - 1 < 1) {
      this.item_qty = 1;
      console.log('item_1->' + this.item_qty);
    } else {
      this.item_qty -= 1;
      console.log('item_2->' + this.item_qty);
    }
  }
  change() {
    // console.log(this.quan);
  }
  public async remove(idCartItem: number) {
    this.cart.removeProductToCart(idCartItem).subscribe({
      next: (response) => {
        this.cart.loadCart();
        alert("Sản phẩm đã bị xóa khỏi cart");
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

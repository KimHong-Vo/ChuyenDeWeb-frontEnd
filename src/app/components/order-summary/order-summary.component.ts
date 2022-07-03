import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { CartItem } from 'src/app/models/cart-item';
import { Order } from 'src/app/models/order';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {

  order!: Order;
  estimatedDeliveryDate = "";
  cartItemList: CartItem[] = [{
    id: 10,
    subtotal: 5,
    qty: 15,
    book:  {
      id: 1,
      title: "Angular tutorial",
      author: "ltphat",
      publisher: "Nong Lam",
      ationDate: "no Date",
      language: "VN",
      category: "book",
      numberOfPages: 10,
      format: "no",
      isbn: "123",
      shippingWeight: 12,
      listPrice: 125,
      ourPrice: 156,
      active: true,
      description: "good book",
      inStockNumber: 6,
  },
    // shoppingCart: {
    //   id: 15,
    //   grandTotal: 12,
    //   user: {
    //     id: number;
    //     firstName: string;
    //     lastName: string;
    //     username: string;
    //     password: string;
    //     email: string
    //     phone: string;
    //     enabled: boolean;
    //     userPayments: UserPayment[];
    //     userShippingList: UserShipping[];    
    //   }
    // },
    toUpdate: false
  }];

  constructor(private checkoutService: CheckoutService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  onSelectBook(book: Book) {
    this.router.navigate(['bookDetails', book.id]);
  }

  onRemoveCartItem(cartItem: CartItem) {
    // TODO

  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.order = JSON.parse(params['order']);
        let deleveryDate = new Date();
        if (this.order.shippingMethod === 'groundShipping') {
          deleveryDate.setDate(deleveryDate.getDate() + 5);
        } else {
          deleveryDate.setDate(deleveryDate.getDate() + 3);
        }
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.estimatedDeliveryDate = days[deleveryDate.getDay()] +
          ',' + deleveryDate.getFullYear() + '/' + deleveryDate.getMonth() + '/' + deleveryDate.getDate();
        this.cartItemList = this.order.cartItemList;
      }
    );
  }

}

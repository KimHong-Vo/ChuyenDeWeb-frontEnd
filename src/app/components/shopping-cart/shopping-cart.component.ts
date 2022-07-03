import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  emptyCart: boolean=false;
  item_qty: number=0;
  quan =1;
  max =5;
  constructor() { }

  ngOnInit(): void {
  }
  incrementQty(){
    this.item_qty += 1;
    console.log(this.item_qty + 1);
    }

    //decrements item

    decrementQty(){
    if(this.item_qty-1 < 1){
      this.item_qty = 1;
      console.log('item_1->' + this.item_qty)
    }
    else{
      this.item_qty -= 1;
      console.log('item_2->' + this.item_qty);
    }
    }
    change(){
      console.log(this.quan);
    }
}

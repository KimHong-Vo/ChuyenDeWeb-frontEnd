import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

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
  idUser:string="";
  c:Cart=new Cart();
  constructor(private cart:CartService, private route: Router, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      params => this.idUser= params['id']);
      this.cart.loadCart(this.idUser).subscribe((respone:Cart)=>{
        this.c= respone;
      }, (error:HttpErrorResponse)=>{
       alert("Loi dong 27");
      })
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

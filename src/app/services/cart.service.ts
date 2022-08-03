import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  public loadCart():Observable<Cart>{
    return this.http.get<Cart>(environment.apiBaseUrl+'/cart/user');

  }
  public addProductToCart(bookID:number):Observable<string>{
    return this.http.get<string>(environment.apiBaseUrl+'/cart/addCart/'+bookID);
  }

  public removeProductToCart(cartItem:number):Observable<boolean>{
    return this.http.get<boolean>(environment.apiBaseUrl+'/cart/removeProduct/'+cartItem);
  }
}

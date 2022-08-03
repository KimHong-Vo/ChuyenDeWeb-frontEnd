import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { browerSize } from 'src/app/constants/browerSize';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  numberGridCols: number = 1;
  numberBookPicCol: number = 1;
  numberDetailCol: number = 1;
  numberPriceCol: number = 1;
  book: Book = new Book();
  idBook: string = '';
  resultAfterAddCart: string = '';
  idBookToAddCart: number = 0;
  constructor(
    private bs: BookService,
    private cartService: CartService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.setCols();
  }

  @HostListener('window:resize') onResizeBrowser() {
    this.setCols();
  }

  setCols() {
    this.numberGridCols = browerSize.getSize();
    if (this.numberGridCols == 4) {
      this.numberBookPicCol = 1;
      this.numberDetailCol = 2;
      this.numberPriceCol = 1;
    } else if (this.numberGridCols == 3) {
      this.numberBookPicCol = 1;
      this.numberDetailCol = 2;
      this.numberPriceCol = 3;
    } else {
      this.numberBookPicCol = this.numberGridCols;
      this.numberDetailCol = this.numberGridCols;
      this.numberPriceCol = this.numberGridCols;
    }
  }

  addProductToCart(id: number) {
    this.router.params.subscribe((params) => {
      this.idBookToAddCart = id;
      this.cartService.addProductToCart(id).subscribe(
        {
          next: (respone) => {
            this.resultAfterAddCart = respone;
            console.log(this.resultAfterAddCart);

            alert(this.resultAfterAddCart);
          },
          error: (error) => {
            console.log(error);

            // alert('Loi dong 58');
          }
        }
      );
    });
  }
  ngOnInit(): void {
    // this.book.author = 'Kim';
    // this.book.title = 'Explore the new world with Tomy';
    // this.book.id= 123;
    // this.book.ourPrice = 200000;
    // this.book.listPrice = 240000;
    // this.book.description = 'Have you ever thougth that has another world in our infinity space? This book will tell you'+
    //                         'the world of Tomy, he can see it explicit when he fall in sleep, let come and explore the new world';
    // this.book ={id: 123, title: 'book 1', author: 'kim', active: true, ationDate: '', category:'', description:'hello',
    // format:'', inStockNumber:0, isbn:'', language:'VN', listPrice:86000, numberOfPages:200, ourPrice:94000,
    // publisher:'', shippingWeight:1};
    this.router.params.subscribe((params) => (this.idBook = params['id']));
    this.bs.getBookById(this.idBook).subscribe(
      (respone: Book) => {
        this.book = respone;
      },
      (error: HttpErrorResponse) => {
        alert('Loi dong 57');
      }
    );
    // }
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { browerSize } from 'src/app/constants/browerSize';
import { Book } from 'src/app/models/book';
import { BookFilterRequest } from 'src/app/requests/bookFilterRequest';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public filterQuery = "";
  public rowsOnPage = 5;
  bookList$: Observable<Book[]|null>;
  bookListBehavior: BehaviorSubject<Book[]|null> = new BehaviorSubject<Book[]|null>(null);
  numberItemOnCol : number = browerSize.getSize();
  pageEvent?: PageEvent = new PageEvent();
  filter: BookFilterRequest = new BookFilterRequest();
  totalItem: number =0;
  constructor(private bookService: BookService, private http : HttpClient, private router: Router, private route: ActivatedRoute) {
    this.filter.pageIndex = 0;
    this.filter.pageSize= 16;
    console.log("path title param = " + route.snapshot.params['title']);
    this.filter.titlePart = route.snapshot.params['title'];
    this.filter.orderPriceFilter=1;
    this.bookList$  = this.bookListBehavior.asObservable();
  }

  ngOnInit(): void {
    //set number item per one column
    this.getBook();
    // this.bookList = [{id: 123, title: 'book 1', author: 'kim', active: true, ationDate: '', category:'', description:'hello',
    //                   format:'', inStockNumber:10, isbn:'', language:'VN', listPrice:86000, numberOfPages:200, ourPrice:94000,
    //                   publisher:'', shippingWeight:1},
    //                 {id: 124, title: 'book 1', author: 'kim', active: true, ationDate: '', category:'', description:'hello',
    //                 format:'', inStockNumber:10, isbn:'', language:'VN', listPrice:86000, numberOfPages:200, ourPrice:94000,
    //                 publisher:'', shippingWeight:1},
    //               {id: 125, title: 'book 1', author: 'kim', active: true, ationDate: '', category:'', description:'hello',
    //               format:'', inStockNumber:10, isbn:'', language:'VN', listPrice:86000, numberOfPages:200, ourPrice:94000,
    //               publisher:'', shippingWeight:1}];
    // get Items from server
    // this.bookService.getBooks().subscribe((response: Book[]) => {
    //   this.bookList = response;
    // }, (error: HttpErrorResponse) => {
    //   alert(error.message);
    // })
  }
  @HostListener('window:resize') onResize(){
    this.numberItemOnCol = browerSize.getSize();
    console.log('call onresize');
  }
  
  onSelectBook(book: Book){
    this.router.navigate(['bookDetails', book.id]);
  }

  public handlePage(e: PageEvent){
    // console.log("page index is:" + e.pageIndex);
    // update book list using book service to get data with limit(length) and start index to get(pageIndex)
    this.filter.pageIndex = e.pageIndex;
    this.filter.pageSize = e.pageSize;
    this.getBook();
    return e;
  }

  public async getBook(){
    this.bookService.getBooksWithLimit(this.filter).subscribe(response =>{
      this.bookListBehavior.next( response.books);
      this.totalItem = response.totalItem;
      // this.bookList$.forEach(b =>{console.log("hello")})
      
    }, (error: HttpErrorResponse) =>{console.log(error.status)})
  }

}

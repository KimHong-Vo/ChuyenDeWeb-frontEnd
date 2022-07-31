import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { browerSize } from 'src/app/constants/browerSize';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public filterQuery = "";
  public rowsOnPage = 5;
  bookList: Book[] = [];
  numberItemOnCol : number = browerSize.getSize();
  pageEvent?: PageEvent = new PageEvent();
  pageIndex: number = 0;
  constructor(private bookService: BookService, private http : HttpClient, private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    //set number item per one column

    this.bookList = [{id: 123, title: 'book 1', author: 'kim', active: true, ationDate: '', category:'', description:'hello',
                      format:'', inStockNumber:10, isbn:'', language:'VN', listPrice:86000, numberOfPages:200, ourPrice:94000,
                      publisher:'', shippingWeight:1},
                    {id: 124, title: 'book 1', author: 'kim', active: true, ationDate: '', category:'', description:'hello',
                    format:'', inStockNumber:10, isbn:'', language:'VN', listPrice:86000, numberOfPages:200, ourPrice:94000,
                    publisher:'', shippingWeight:1},
                  {id: 125, title: 'book 1', author: 'kim', active: true, ationDate: '', category:'', description:'hello',
                  format:'', inStockNumber:10, isbn:'', language:'VN', listPrice:86000, numberOfPages:200, ourPrice:94000,
                  publisher:'', shippingWeight:1}];
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

  public handlePage(e?: PageEvent){
    console.log("page index is:" + this.pageIndex);
    // update book list using book service to get data with limit(length) and start index to get(pageIndex)
    return e;
  }

  public addProduct(){
    this.bookList.push({id: 125, title: 'book added', author: 'kim', active: true, ationDate: '', category:'', description:'hello',
    format:'', inStockNumber:10, isbn:'', language:'VN', listPrice:86000, numberOfPages:200, ourPrice:94000,
    publisher:'', shippingWeight:1});
    console.log("book size: " + this.bookList.length);
  }

}

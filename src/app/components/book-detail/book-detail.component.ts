import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { browerSize } from 'src/app/constants/browerSize';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  numberGridCols: number =1;
  numberBookPicCol: number=1;
  numberDetailCol: number=1;
  numberPriceCol: number=1;
  book: Book = new Book();
  idBook:string = "";
  constructor(private bs:BookService, private route: Router, private router:ActivatedRoute){
  }

  @HostListener('window:resize') onResizeBrowser(){
    this.setCols();
  }

  setCols(){
    this.numberGridCols = browerSize.getSize();
    if(this.numberGridCols==4){
      this.numberBookPicCol = 1;
      this.numberDetailCol=2;
      this.numberPriceCol=1;
    }
    else if(this.numberGridCols == 3 ){
      this.numberBookPicCol = 1;
      this.numberDetailCol=2;
      this.numberPriceCol=3;
    }
    else{
      this.numberBookPicCol = this.numberGridCols;
      this.numberDetailCol=this.numberGridCols;
      this.numberPriceCol=this.numberGridCols;
    }
  }

  ngOnInit(): void {
    // this.book.author = 'Kim';
    // this.book.title = 'Explore the new world with Tomy';
    // this.book.id= 123;
    // this.book.ourPrice = 200000;
    // this.book.listPrice = 240000;
    // this.book.description = 'Have you ever thougth that has another world in our infinity space? This book will tell you'+
    //                         'the world of Tomy, he can see it explicit when he fall in sleep, let come and explore the new world';

    this.router.params.subscribe(
       params => this.idBook= params['id']);
       this.bs.getBookById(this.idBook).subscribe((respone:Book)=>{
         this.book = respone;
       }, (error:HttpErrorResponse)=>{
        alert("Loi dong 57");
       })

    }


}

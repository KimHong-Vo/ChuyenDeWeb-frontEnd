import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { User } from 'src/app/models/user';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedIn = false;
  books: Book[] = [];
  keyWord: string = '';
  navbar = document.getElementById("navbar");
  constructor(private bookService: BookService, private router: Router, private uService: UserService) {

    // add listener for sticky navigation
    document.addEventListener('DOMContentLoaded', function name() {
      window.addEventListener('scroll', myFunctionForSticky);
      let navbar = document.getElementById("navbar");
      let sticky = navbar!.offsetTop;
      function myFunctionForSticky() {
        if (window.pageYOffset >= sticky) {
          console.log("window.pageYOffset >= sticky");
        } else {
          console.log("Not window.pageYOffset >= sticky");
        }
        if (window.pageYOffset >= sticky) {
          navbar!.classList.add("sticky");
        } else {
          navbar!.classList.remove("sticky");
        }
      }
     })
   }

  ngOnInit(): void {
    
  }

  public logout(): void{

  }
  public onSearchByTitle(){

  }

}

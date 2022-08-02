import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, observable, Observable } from 'rxjs';
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
  books: Book[] = [];
  keyWord: string = '';
  user$! : Observable<User|null>;
  navbar = document.getElementById("navbar");
  mynum = 1;
  time = new Observable<string>((observer) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
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

     //set User
     this.user$ = this.uService.user$;
    //  if(!this.user$){
    //     console.log("navbar user null")
    //  }
    //  else{
    //   this.user$.subscribe(value=>{
    //     console.log("nav bar user: " + value?.username);
    //   })
    //  }
   }

   @HostListener('window:onClick') onClick(){
    window.onclick = function(event) {
      if (event.target == document.getElementById('logout')) {
        document.getElementById('logout')!.style.display = "none";
      }
    }
   }
  ngOnInit(): void {
  }
  public onClickLogout(){
    document.getElementById('logout')!.style.display = "block";
  }
  public logout(): void{
    this.uService.removeJWT();
    this.closeLogoutDialog();
  }
  public closeLogoutDialog(){
    document.getElementById('logout')!.style.display = "none";
  }
  public onSearchByTitle(){
    this.router.navigate(['book-list', this.keyWord]);
  }


}


import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-store';
  constructor(private userService: UserService){
    let token = window.localStorage.getItem('JWT_id');
    if(token){
      this.userService.getUserByToken().subscribe(res=>{
      this.userService.userBehavior.next(res);
      })
    }
  }
}

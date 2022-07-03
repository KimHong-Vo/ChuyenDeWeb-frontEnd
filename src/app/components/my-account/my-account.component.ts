import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  credentials = {'username': '', 'password': ''};
  email = new FormControl("", [Validators.required, Validators.email]);
  passWord = new FormControl();
  hide = true;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  public onLogin(){
    this.userService.login(this.email.value, this.passWord.value).subscribe((response) =>{
      this.userService.user = response;
    }, (error) =>{
      console.log(error.getErrorMessage());
    })
    if(this.userService.validateLogin()){
      console.log("Fail to login");
    }
    else{
      console.log(this.userService.user.firstName);
    }
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}

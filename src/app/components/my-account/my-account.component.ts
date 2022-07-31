import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
export function matchedPassword(c: AbstractControl) {
  const passwordValue = c.get('password')?.value;
  const confirmPasswordValue = c.get('confirmPassword')?.value;
  if (passwordValue === confirmPasswordValue) {
    return null;
  } else {
    return { isMatch: false };
  }
}
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
  registerForm!: FormGroup;
  constructor(private userService: UserService, private route: Router) {
    // this.email.setErrors(Validators.email).
    this.registerForm = new FormGroup({
      remail: new FormControl('', [Validators.required, Validators.email]),
      rfullName: new FormControl('', [Validators.required]),
      rpasswordGr: new FormGroup(
        {
          rpassword: new FormControl(null, Validators.required),
          rconfirmPassword: new FormControl(null, Validators.required),
        },
        matchedPassword
      ),
    });
   }

  ngOnInit(): void {
  }

  public onLogin(){
    localStorage.removeItem("JWT_id");
    this.userService.login(this.email.value, this.passWord.value).subscribe(response =>{
      // this.userService.userBehavior.next(response);
      this.userService.setToken(response);
      // console.log("ma:"+localStorage.getItem("JWT_id"));
      this.userService.getUserByToken().subscribe(res=>{
        this.userService.userBehavior.next(res);
      })
      // this.userService.user$.subscribe(value=>{
      //   console.log("user: " + value?.username);
      // })
    }, (error: HttpErrorResponse) =>{
      console.log("error");
      console.log(error.status);
    })
    if(this.userService.validateLogin()){
      this.route.navigateByUrl("/");
    }
    else{
      console.log("Fail to login"); 
    }
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onRegister(){}

}

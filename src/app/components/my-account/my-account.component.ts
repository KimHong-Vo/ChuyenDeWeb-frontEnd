import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ExistEmailValidator } from 'src/app/validators/existEmailValidator';
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
  email:FormControl;
  passWord = new FormControl("", [Validators.required]);
  hide = true;
  registerForm!: FormGroup;
  constructor(private emailExistValidator: ExistEmailValidator , private userService: UserService, private route: Router) {
    // this.email.setErrors(Validators.email).
    this.email = new FormControl("", {validators: [Validators.required, Validators.email], 
      asyncValidators:[this.emailExistValidator.validate.bind(this.emailExistValidator)], updateOn: 'blur'});
    // this.email.addAsyncValidators([this.emailExistValidator.validate.bind(this.emailExistValidator)]);
    // this.email.up
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
      alert("Fail to login: Please check your password again!");
      this.passWord.setValue("");
      this.route.navigateByUrl("/my-account");
    }
  }
  getLoginEMailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter Email';
    }
    if(this.email.hasError('email')) return  'Not a valid email';
    if(this.email.hasError('emailNotExist')) return "Email did not exist";
    return "exist";
  }

  getLoginPasswordErrorMessage(){
    return this.passWord.hasError('required') ? 'You must enter Password' : '';
  }
  onRegister(){}

}

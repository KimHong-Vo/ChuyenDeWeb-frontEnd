import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authenticated = false;
  user!: User;
  constructor(private http: HttpClient) { }

  public validateEmail(email: string): Observable<Boolean>{
    return this.http.post<Boolean>(environment.apiBaseUrl + '/user/validateEmail', email);
  }

  public validateLogin():boolean{
    return this.user!=null;
  }

  public login(email:String, password:string): Observable<User>{
    let data = {email: email,password: password};
    return this.http.post<User>(environment.apiBaseUrl + '/user/login', data);
  }
}

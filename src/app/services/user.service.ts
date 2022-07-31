import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //using behavior to async update for user 
  userBehavior!: BehaviorSubject<User|null>;
  user$!: Observable<User|null>;
  constructor(private http: HttpClient) {
    this.userBehavior= new BehaviorSubject<User|null>(null); 
    this.user$ = this.userBehavior.asObservable();
  }

  public validateEmail(email: string): Observable<Boolean>{
    return this.http.post<Boolean>(environment.apiBaseUrl + '/user/validateEmail', email);
  }

  public validateLogin():boolean{
    return this.user$!=null;
    // return !this.user$;
  }

  public login(email:String, password:string): Observable<string>{
    let data = {email: email,password: password};
    const reqOption: Object = {responseType: 'text'};
    return this.http.post<string>(environment.apiBaseUrl + '/user/login', data, reqOption);
  }
  public getUserByToken(): Observable<User>{
    return this.http.get<User>(environment.apiBaseUrl + '/user/getUser');
  }

  public setToken(token: string){
    window.localStorage.setItem('JWT_id', token);  
  }

  public logout(): Observable<void>{
   return this.http.post<void>(environment.apiBaseUrl + '/user/logout', {});
  }

  public removeJWT(){
    this.logout().subscribe();
    this.userBehavior.next(null);
    window.localStorage.removeItem('JWT_id');
  }
}

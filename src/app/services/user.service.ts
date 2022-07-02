import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authenticated = false;
  constructor(private http: HttpClient) { }

  public validateEmail(email: string): Observable<Boolean>{
    return this.http.post<Boolean>(environment.apiBaseUrl + '/user/validateEmail', email);
  }

  public authenticate(credentials: any, callBack: undefined){
    const headers = new HttpHeaders(credentials?{authorization : 'basic ' 
    + btoa(credentials.username + ':' + credentials.password)}:{});
    this.http.get(environment.apiBaseUrl, {headers: headers}).subscribe(response =>{
      if (response) {
        this.authenticated = true;
        console.log('response login:' + response);
      } else {
        this.authenticated = false;
        console.log('fail login:' + response);
      }
      return callBack;
    })
  }

  public checkCredential(): boolean{
    return false;
  }

  public retrieveToken(code: string){}
}

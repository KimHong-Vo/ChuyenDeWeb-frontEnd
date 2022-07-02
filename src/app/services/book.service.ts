import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiBaseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { 
    console.log(this.apiBaseUrl);
  }

  public getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.apiBaseUrl+'/book/book-list');
  }

  public getBooksWithLimit(limit: number, startIndex: number): Observable<Book[]>{
    return this.http.get<Book[]>(this.apiBaseUrl+'/book/book-list?page=' + startIndex + '&length=' + limit);
  }

  public addBook(book: Book): Observable<Book>{
    return this.http.post<Book>(this.apiBaseUrl+'/book/add', book);
  }

  public removeBook(id: number): Observable<void>{
    return this.http.post<void>(this.apiBaseUrl+'/bookremove', id);
  }

  //async for searching book
  public suggestKeyWords(originWord: string): Observable<String>{
    return this.http.get<String>(this.apiBaseUrl+'/book/suggessKeyWord?originWord=' + originWord);
  }
}

import { Injectable } from '@angular/core';
import { Books } from '../app/shared/books.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3002/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> { 
    return this.http.get(baseUrl+"/getAll");
  }

  addBook(book: Books): Observable<any> { 
    return this.http.post(baseUrl+"/add",book);
  }

  updateBook(id: number, updatedBook: Books): Observable<any>  { 
    return this.http.patch(baseUrl+"/updateById/"+id,updatedBook)

  }

  deleteBook(id: number): Observable<any>  {
    debugger
    return this.http.delete(baseUrl+"/deleteById/"+id);
  }
  
}

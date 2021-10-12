import { Injectable } from '@angular/core';
import { Ganre } from '../app/shared/ganre.model ';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3002/genres';

@Injectable({
  providedIn: 'root'
})
export class GanreService {

  constructor(private http: HttpClient) { }

  ganres: Ganre[] = []

  getAllGanres(): Observable<any> { 
    return this.http.get(baseUrl+"/getAll");
  }
  
}

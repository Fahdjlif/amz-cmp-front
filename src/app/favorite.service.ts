import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './model/models';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient) { }
 
  getUserFavorites(): Observable<any> {
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', 'Bearer '+localStorage.getItem("token"))
    };
    return this.http.get<any>(environment.serverUrl +'/api/user/'+localStorage.getItem("userId")+"/favorite",httpOptions);
}
addUserFavorite(product :Product): Observable<any> {
  var httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', 'Bearer '+localStorage.getItem("token"))
  };
  return this.http.post<any>(environment.serverUrl +'/api/user/'+localStorage.getItem("userId")+"/favorite",product,httpOptions);
}
}

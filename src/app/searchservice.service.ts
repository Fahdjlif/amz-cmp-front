import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchFilter, SearchResult, AmzAccount } from './model/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchserviceService {

  constructor(private http: HttpClient) { }
getProducts(searchFilter : SearchFilter): Observable<SearchResult>{
 
 
  var httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  searchFilter.availability=searchFilter.availability==String.apply(false)?"true":"false";
  var userId=localStorage.getItem("userId") !=null ? localStorage.getItem("userId") :"-1";
  return this.http.post<any>(environment.serverUrl +'/api/search?userId='+userId,searchFilter,httpOptions);
}

getAccounts(): Observable<AmzAccount[]>{
  var httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  return this.http.get<any>(environment.serverUrl +'/api/account/getall',httpOptions);
}
load() {
  var httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  return new Promise((resolve, reject) => {
    this.http.get<any>(environment.serverUrl +'/api/account/getall',httpOptions)
          .subscribe(response => {
            localStorage.setItem("showFrom", JSON.stringify(response));
              resolve(true);
          })
  })
}
}

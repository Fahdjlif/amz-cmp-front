import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Product, SavedSearch } from './model/models';
import { environment } from 'src/environments/environment';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private _isLoggedIn : boolean;
  constructor(private http: HttpClient) {
  }
  get isLoggedIn() {
    return this._isLoggedIn;
}
  set isLoggedIn(value: boolean) {
  this._isLoggedIn = value;
}
  readonly httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*', 'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT'})
	};
    

    login(user:User): Observable<any> {
        let httpOptions = {
            headers: new HttpHeaders().set('Authorization', btoa(user.email+':'+user.password))
        };
        return this.http.post<any>( environment.serverUrl + '/api/login',{},httpOptions);
    }
   
    registerUser(user:User,locale:string): Observable<User>{
      var httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
      return this.http.post<any>( environment.serverUrl + '/api/create/user?locale='+locale,user,httpOptions);
    }
    changePassword(credentias:any): Observable<any> {
       var httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', 'Bearer '+localStorage.getItem("token"))
      };
      return this.http.put<any>( environment.serverUrl + '/api/user/'+localStorage.getItem("userId"),credentias,httpOptions);
  }
  addFavorite(product :Product ): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', 'Bearer '+localStorage.getItem("token"))
    };
    return this.http.post<any>( environment.serverUrl + '/api/user/'+localStorage.getItem("userId")+"/favorite",product 
    ,httpOptions);
  }
  removeFavorite(product :Product): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', 'Bearer '+localStorage.getItem("token"))
    };
    return this.http.delete<any>( environment.serverUrl + '/api/user/'+localStorage.getItem("userId")+"/favorite?favoriteAsin=" +product.asin,httpOptions);
  }
  getUserFavorites(): Observable<Product[]>{
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', 'Bearer '+localStorage.getItem("token"))
    };
    return this.http.get<Product[]>( environment.serverUrl + '/api/user/'+localStorage.getItem("userId")+"/favorite" ,httpOptions);
  }

  addSearch(search :SavedSearch ): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', 'Bearer '+localStorage.getItem("token"))
    };
    return this.http.post<any>( environment.serverUrl + AppConfig.getSavedSearchEndpoint(),search 
    ,httpOptions);
  }
  removeSearch(search :SavedSearch): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', 'Bearer '+localStorage.getItem("token"))
    };
    return this.http.delete<any>( environment.serverUrl + AppConfig.getSavedSearchEndpoint()+"?searchId=" +search.id,httpOptions);
  }
  getUserSearchs(): Observable<SavedSearch[]>{
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', 'Bearer '+localStorage.getItem("token"))
    };
    return this.http.get<SavedSearch[]>( environment.serverUrl + AppConfig.getSavedSearchEndpoint() ,httpOptions);
  }
  activateAccount(token:string){
    var httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get( environment.serverUrl +`/api/activate/${token}` ,httpOptions);
  }
}

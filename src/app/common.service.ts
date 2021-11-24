import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SearchFilter } from './model/models';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private savedSearchAdded = new Subject<string>();
  savedSearchAdded$ = this.savedSearchAdded.asObservable();
  constructor(private http: HttpClient) {

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      })
    };

    this.http.get<any>(environment.serverUrl + "/api/check", httpOptions).subscribe(
      data => {
        this.isUserLoggedIn.next(true)
        

      },
      error => {
        this.isUserLoggedIn.next(false)
        localStorage.setItem("userId","-1");
      })

  }
  private _isLoggedIn: boolean;
  private _role: string;
  private _idUser: string;
  private _email: string;
  private _token: string;
  private _isForSearch:boolean;
  private searchFilter: BehaviorSubject<SearchFilter>= new BehaviorSubject<SearchFilter>({ keyword: "",
    availability: "",
    condition: "",
    currencyOfPreference: "",
    localeCode:"",
    sortBy:"",
    deliveryFlags: [],
    itemCount: 0,
    itemPage: 0,
    maxPrice: 0,
    minPrice: 0,
    minReviewsRating: 0,
    showPricesFromList: []} as SearchFilter);
  currentSearchFilter = this.searchFilter.asObservable();

  setSearchFilter(message: SearchFilter) {
    this.searchFilter.next(message)
  }

  
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }
  get isForSearch(): boolean {
    return this._isForSearch;
  }

  set isForSearch(value: boolean) {
    this._isForSearch = value;
  }
  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get idUser(): string {
    return this._idUser;
  }

  set idUser(value: string) {
    this._idUser = value;
  }
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  announceMissionSavingSearch(ss: string) {
    this.savedSearchAdded.next(ss);
  }

}

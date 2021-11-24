import { Component,LOCALE_ID, Inject  } from '@angular/core';
import { TranslateService } from './translate.service';
import { AppConfig } from './app-config';
import { SearchserviceService } from './searchservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product-guides';
  constructor(private translate: TranslateService,@Inject(LOCALE_ID) public locale: string,private searchService:SearchserviceService) {
    this.translate.use(locale);
    if (localStorage.getItem("activeCurrency") == null) {
      localStorage.setItem("activeCurrency", "EUR");
    }
    if (localStorage.getItem("currencies") ==null) {
      localStorage.setItem("currencies",JSON.stringify(  AppConfig.currenciesList));
    }
    
   
  }

 
}


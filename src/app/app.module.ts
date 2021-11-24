import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductComponent } from './product/product.component';
import { PriceComponent } from './price/price.component';
import { ResultComponent } from './result/result.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrefrencesModalComponent } from './prefrences-modal/prefrences-modal.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { HttpClientModule } from '@angular/common/http';
import { SavedSearchComponent } from './saved-search/saved-search.component';
import { SaveSearchModalComponent } from './save-search-modal/save-search-modal.component';
import { FooterComponent } from './footer/footer.component';
import { CoockieComponent } from './coockie/coockie.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SearchserviceService } from './searchservice.service';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
export function accountsProviderFactory( searchService:SearchserviceService) {
  return () => searchService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProductComponent,
    PriceComponent,
    ResultComponent,
    SearchComponent,
    HeaderComponent,
    DashboardComponent,
    ChangePasswordComponent,
    PrefrencesModalComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SavedSearchComponent,
    SaveSearchModalComponent,
    FooterComponent,
    CoockieComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    StarRatingModule.forRoot()
    
    
  ],
  providers: [SearchserviceService,
    { provide: APP_INITIALIZER, useFactory: accountsProviderFactory, deps: [SearchserviceService], multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

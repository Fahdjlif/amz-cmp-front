import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SearchFilter, AmzAccount } from '../model/models';
import { CommonService } from '../common.service';
import { AppConfig } from '../app-config';
declare var $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  accounts: AmzAccount[] = JSON.parse(localStorage.getItem("showFrom")).filter(e => e.active && !e.comingSoon);
  searchFilter: SearchFilter;
  rating:number;
  form: FormGroup = new FormGroup({
    keyword: new FormControl('', [Validators.required]),
    availability: new FormControl(''),
    condition: new FormControl(''),
    maxPrice: new FormControl(''),
    minPrice: new FormControl(''),
    minReviewsRating: new FormControl(''),
    deliveryFlags: new FormControl(''),
    sortBy: new FormControl(''),
    accounts: new FormControl('')
  });

  loading = false;
  submitted = false;
  isLoggedIn: boolean = false;
  error: string = "";
  constructor(private commonService: CommonService) {
    this.commonService.isUserLoggedIn.subscribe((v) => {
      this.isLoggedIn = v;
    })

  }

  ngOnInit(): void {
    
    this.commonService.currentSearchFilter.subscribe(searchFilter => this.searchFilter = searchFilter);

    this.commonService.currentSearchFilter.subscribe(searchFilter => {

      this.form.controls.keyword.setValue(searchFilter.keyword);
      this.form.controls.availability.setValue(searchFilter.availability);
      this.form.controls.condition.setValue(searchFilter.condition);
      searchFilter.deliveryFlags == [] ? this.form.controls.deliveryFlags.setValue("") :
        this.form.controls.deliveryFlags.setValue(searchFilter.deliveryFlags);
      this.form.controls.sortBy.setValue(searchFilter.sortBy);
      this.form.controls.accounts.setValue(searchFilter.primaryCountry);
      this.rating=searchFilter.minReviewsRating;
      setTimeout(() => {
        var slider=  $('#range_slider_3').data("ionRangeSlider");
        slider.update({
         from:this.searchFilter.minPrice,
         to:this.searchFilter.maxPrice
        });
   
        
      }, 500);
     

    });


  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;

    }
    this.updateSearchFilter(true);



  }

  updateSearchFilter(forSearch: boolean): void {
    this.commonService.isForSearch = forSearch;
    var showPricesFromList = JSON.parse(localStorage.getItem("showFrom"))
    var showPricesFrom = [];
    showPricesFromList.forEach(e => {
      if (e.active && !e.comingSoon) {
        showPricesFrom.push(e.localeCode);
      }
    });
    var deliveryFlags = this.form.controls.deliveryFlags.value != "" ? this.form.controls.deliveryFlags.value : [];
    var activeCurrency = localStorage.getItem("activeCurrency");
    var primaryAccount = this.form.controls.accounts.value !=undefined ? this.form.controls.accounts.value:"USA";
    
    this.commonService.setSearchFilter({
      keyword: this.form.controls.keyword.value, availability: $('#availabilitySwitch')[0].checked, deliveryFlags: deliveryFlags,
      condition: this.form.controls.condition.value, sortBy: this.form.controls.sortBy.value, minReviewsRating:this.form.controls.minReviewsRating.value,
      maxPrice: $('#range_slider_3')[0].value.substr($('#range_slider_3')[0].value.indexOf(';') + 1, $('#range_slider_3')[0].value.length),
      minPrice: $('#range_slider_3')[0].value.substr(0, $('#range_slider_3')[0].value.indexOf(';')), currencyOfPreference: activeCurrency,
      localeCode: activeCurrency, showPricesFromList: showPricesFrom, itemPage: 1, primaryCountry: primaryAccount
    } as SearchFilter);
  }

  ngAfterViewInit(): void {
    
     $('#range_slider_3').ionRangeSlider({
      type: "double",
      grid: true,
      min: 0,
      max: 10000,
      from: 1,
      to: 5000,
      prefix: this.getPrefix(localStorage.getItem("activeCurrency"))
    });


  }
  refreshSearchFilter()
  {
    this.commonService.setSearchFilter({} as SearchFilter);
    setTimeout(() => {
      var slider=  $('#range_slider_3').data("ionRangeSlider");
      slider.update({
       from:0,
       to:5000
      });
     // $("#rating").rateit("value",0);
      
    }, 500);
  }


  getPrefix(code) {
    switch (code) {

      case "EUR":

        return "€";
      case "USD":

        return "$";
      default:
        return "£";
    }
  }
  getFlag(code) {
    return AppConfig.getFlag(code);
  }

}
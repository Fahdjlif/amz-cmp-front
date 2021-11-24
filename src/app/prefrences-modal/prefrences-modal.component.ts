import { Component, OnInit } from '@angular/core';
import { Currency, AmzAccount } from '../model/models';
import { AppConfig } from '../app-config';
import { SearchserviceService } from '../searchservice.service';
declare var $:any;

@Component({
  selector: 'app-prefrences-modal',
  templateUrl: './prefrences-modal.component.html',
  styleUrls: ['./prefrences-modal.component.css']
})
export class PrefrencesModalComponent implements OnInit {

  currencies: Currency[] = [];
  accounts: AmzAccount[] = [];
  radioSelected: string;
  radioSel: any;
  radioSelectedString: string;
  constructor(private searchService: SearchserviceService) {

    this.currencies = localStorage.getItem("currencies") != null ? JSON.parse(localStorage.getItem("currencies")) : AppConfig.currenciesList;
    this.radioSelected = this.currencies.filter(e => e.isActive)[0] != null ? this.currencies.filter(e => e.isActive)[0].code : "USD";
    this.searchService.getAccounts().subscribe(res => {
      if (localStorage.getItem("showFrom") != null) {
        var showFromList :AmzAccount[]= JSON.parse(localStorage.getItem("showFrom"));
        this.accounts = showFromList;
      } else {
        this.accounts = res;
        localStorage.setItem("showFrom", JSON.stringify(res));

      }

    },
      err => {
        console.error(err);
      });

  }

  ngOnInit(): void {

  }

  getSelecteditem() {
    this.radioSel = this.currencies.find(Item => Item.code === this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.radioSel);
    this.currencies.forEach(c => {
      if (c.code == this.radioSel.code) {
        c.isActive = true;
      } else {
        c.isActive = false;
      }
    })
  }

  onChange(e) {

    this.getSelecteditem();
  }
  onShowFromChange(e){
    this.accounts.forEach(acc=>{
      if (acc.localeCode == e.value) {
        acc.active=e.checked;
      }
    });
  }
  submit() {

    localStorage.setItem("currencies", JSON.stringify(this.currencies));
    localStorage.setItem("activeCurrency", this.radioSelected);
    localStorage.setItem("showFrom", JSON.stringify(this.accounts));
    $('.modal').hide();
    $('.modal-backdrop').hide()
  }
  getFlag(code) {
    return AppConfig.getFlag(code);
  }
}

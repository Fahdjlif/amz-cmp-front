import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from '../app-config';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  @Input() flag: string;
  @Input() price: string;
  @Input() buyUrl: string;
  constructor() { }

  ngOnInit(): void {
  }
  onNavigate() {
    window.open(this.buyUrl, '_blank');
  }
  getPriceDisplay(){
    return this.price +" " + AppConfig.currenciesList.filter(c=>c.code ==localStorage.getItem("activeCurrency"))[0].sign ;
  }
}

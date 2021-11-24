import { Component, OnInit, ElementRef, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { Product } from '../model/models';
import { CommonService } from '../common.service';
import { UserServiceService } from '../user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '../translate.service';


declare var Flickity: any;
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,AfterViewInit {
  @Input() product: Product;
  @Output() favoritesChanged: EventEmitter<string> = new EventEmitter<string>();
  isUserLoggedIn :boolean ;
  
  constructor(private el: ElementRef, private commonService: CommonService, private userService:UserServiceService,
    private toasterService:ToastrService,private translate: TranslateService) { 
      this.commonService.isUserLoggedIn.subscribe(val=>{
        this.isUserLoggedIn=val;
      })
    
  }

  ngOnInit(): void {
  
  }

  ngAfterViewInit() {

    const el = this.el.nativeElement;
    const elem = el.querySelector('.carousel');
    new Flickity(elem, {
      imagesLoaded: true,
      percentPosition: true,
      draggable: true,
      wrapAround: true
    });
    $('#gallery-image').magnificPopup({ // says magnificPopup is not a function
      delegate: 'a',
      removalDelay: 500,
      callbacks: {
      beforeOpen: function() {
              this.st.mainClass = this.st.el.attr('data-effect');
          }
      },
      midClick: true
  });
  }
  addOrRemoveFavorite() {
    if (!this.isUserLoggedIn) {
      this.toasterService.warning(this.translate.data["msg.login.favorite"], '', {
        positionClass: 'toast-bottom-right' 
     });
      return;
    }
   
    if (this.product.favorite) {
      this.product.favorite = !this.product.favorite;
      this.userService.removeFavorite(this.product).subscribe(
        data=>{
          this.favoritesChanged.emit("change");
        },
        error=>{}
        );
    } else {
      this.product.favorite = !this.product.favorite;
      this.userService.addFavorite(this.product).subscribe(
        data=>{
          this.favoritesChanged.emit("change");
        },
        error=>{}
        );;
    }
   
  }

  getFlag(key: string): string {
    switch (key) {
      case "FR": return "assets/flags/france.svg";

      case "DE": return "assets/flags/germany.svg";

      case "ES": return "assets/flags/spain.svg";

      case "IT": return "assets/flags/italy.svg";

      case "GB": return "assets/flags/united-kingdom.svg";

      default: return "assets/flags/united-states-of-america.svg";

    }
  }
}


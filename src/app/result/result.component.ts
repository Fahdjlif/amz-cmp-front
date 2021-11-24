import { Component, OnInit, Input } from '@angular/core';
import { Product, SearchFilter } from '../model/models';
import { SearchserviceService } from '../searchservice.service';
import { CommonService } from '../common.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '../translate.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  searchFilter: SearchFilter;
  isForSearch:boolean;
  constructor(private searchService:SearchserviceService, private commonService:CommonService,
    private toasterService:ToastrService,private translate: TranslateService,private spinner: NgxSpinnerService) { }

  products : Product[] = [];
  isLoading = false;
  loadedAll = false;
  isFirstLoad = true;
  ngOnInit(): void {
    this.commonService.currentSearchFilter.subscribe(searchFilter => {this.searchFilter = searchFilter;
if(this.commonService.isForSearch){
      this.products=[]; 
       this.getProducts();
      this.handleScroll();}
    })

    this.handleScroll();
  }

  onNotified(message:SearchFilter){
 
  this.searchFilter=message;
  }
  getProducts(): void {

    this.isLoading = true;
   this.getResult(); 

  }
  private getResult() {
    if (this.searchFilter.keyword =="") {
      return;
    }

    this.searchService.getProducts(this.searchFilter).subscribe(res => {
      if (this.isFirstLoad) {
        this.spinner.show();
      }
      if (res.itemsCount > 0) {
        res.products.forEach((p)=>{
          this.products.push(p);
        })
      }
      else {
        this.loadedAll = true;
        if (this.isFirstLoad) {
          this.toasterService.warning(this.translate.data["no.result.search"], '', {
            positionClass: 'toast-bottom-right' 
         });
        }
      }
      if (!res.hasMore) {
        this.loadedAll = true;
      }
     
      this.isLoading = false;
      this.isFirstLoad = false;
      this.spinner.hide();
    },
    err=>{
      this.spinner.hide();
      console.error(err);
    });
  }

  handleScroll(): void {

    window.onscroll = () => this.detectBottom();
  }
  detectBottom(): void {
    if ((window.innerHeight + window.scrollY ) >= document.body.offsetHeight -$("#footer").innerHeight()) {
      if (!this.loadedAll && !this.isLoading) {
       this.isLoading=true;
       this.searchFilter.itemPage = this.searchFilter.itemPage +1;
       this.getProducts();
      }
    }
}

}

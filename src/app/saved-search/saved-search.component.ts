import { Component, OnInit } from '@angular/core';
import { SavedSearch } from '../model/models';
import { UserServiceService } from '../user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../common.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-saved-search',
  templateUrl: './saved-search.component.html',
  styleUrls: ['./saved-search.component.css']
})
export class SavedSearchComponent implements OnInit {
  savedSearchs: SavedSearch[] = [];
  subscription: Subscription;
  constructor(private userService: UserServiceService, private toasterService: ToastrService,
     private commonService: CommonService,private translate: TranslateService) {
    this.subscription = commonService.savedSearchAdded$.subscribe(
      ss => {
        this.getSavedSearchs();
    });
   }

  ngOnInit(): void {
    this.getSavedSearchs();
  }

  private getSavedSearchs() {
    this.userService.getUserSearchs().subscribe(data => {
      if (data.length > 0) {
        this.savedSearchs = data;
      }
      else {
        this.savedSearchs = [];
      }

    },
      error => {
        this.toasterService.error(this.translate.data["savedsearch.get.error"], '', {
          positionClass: 'toast-bottom-right' 
       });
      });
  }

  removeSavedSearch(savedSearch: SavedSearch) {
    this.userService.removeSearch(savedSearch).subscribe(data => {
      this.toasterService.success(this.translate.data["savedsearch.delete.success"], '', {
        positionClass: 'toast-bottom-right' 
     })
      this.getSavedSearchs();
    },
      error => {
        this.toasterService.error(this.translate.data["savedsearch.delete.error"], '', {
          positionClass: 'toast-bottom-right' 
       })
      });
  }
  executeSearch(savedSearch: SavedSearch) {
    var savedSearchFilter = JSON.parse(savedSearch.value);
    this.commonService.isForSearch=false;
    this.commonService.setSearchFilter(savedSearchFilter);
  }
}

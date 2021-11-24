import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../common.service';
import { SavedSearch, SearchFilter } from '../model/models';
import { TranslateService } from '../translate.service';
declare var $:any;
@Component({
  selector: 'app-save-search-modal',
  templateUrl: './save-search-modal.component.html',
  styleUrls: ['./save-search-modal.component.css']
})
export class SaveSearchModalComponent implements OnInit {
  searchFilter: SearchFilter;

  constructor(private formBuilder: FormBuilder,private userService:UserServiceService,
     private toasterService: ToastrService, private commonService: CommonService,private translate: TranslateService) { }
  saveSearchForm: FormGroup;
  submitted = false;
  success =false;
  error:string ="";
  ngOnInit(): void {
    this.commonService.currentSearchFilter.subscribe(searchFilter => this.searchFilter = searchFilter);
    this.saveSearchForm = this.formBuilder.group({
      name: ['', Validators.required]
  })
}
get f() { return this.saveSearchForm.controls; }
onSubmit() {

  this.submitted = true;
  if (this.saveSearchForm.invalid) {
    return;
  }
  let savedSearch = { name: this.saveSearchForm.controls.name.value, value:JSON.stringify(this.searchFilter)  } as SavedSearch;
console.log(JSON.stringify(this.searchFilter) );
  this.userService.addSearch(savedSearch).subscribe(
    data => {
      this.success=true;
      this.commonService.announceMissionSavingSearch(savedSearch.value)
      this.toasterService.success(this.translate.data["savedsearch.add.success"], '', {
        positionClass: 'toast-bottom-right' 
     })
      $('.modal').hide();
      $('.modal-backdrop').hide()
      
    },
    error => {
      this.toasterService.error(this.translate.data["savedsearch.add.error"], '', {
        positionClass: 'toast-bottom-right' 
     })
    }) 
}
}

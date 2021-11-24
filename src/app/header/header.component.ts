import { Component, OnInit ,LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../common.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean;
  constructor(@Inject(LOCALE_ID) public locale: string,private router : Router,private commonService:CommonService) {
    this.commonService.isUserLoggedIn.subscribe((v)=>{
    this.isLoggedIn=v;
   })

   }

  ngOnInit(): void {
   

  }
  
 logout(){
   localStorage.removeItem("token");
   this.commonService.isUserLoggedIn.next(false);
   localStorage.setItem("userId","-1");
   this.router.navigate(['']);
  
 }
 ngAfterViewInit():void {
  $('.modal').hide();
 }
}

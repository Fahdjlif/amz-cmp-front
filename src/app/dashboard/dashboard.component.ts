import { Component, OnInit } from '@angular/core';
import { Product } from '../model/models';
import { UserServiceService } from '../user-service.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  favorites : Product[] = [];
  constructor(private userService : UserServiceService,private commonService :CommonService) { }

  ngOnInit(): void {

    this.getUserFavorites(null);
  
  }


   getUserFavorites(event) {
    this.userService.getUserFavorites().subscribe(res => {
      if (res.length > 0) {
        this.favorites=res;
      }else{
        this.favorites=[];
      }
    }, error => {
      console.log(error);
    });
  }
}

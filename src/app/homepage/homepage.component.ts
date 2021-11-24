import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../user-service.service';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  token: string;
  constructor(private route: ActivatedRoute, private router: Router, private toasterService: ToastrService,
     private userService: UserServiceService,private translate: TranslateService) {
    if (localStorage.getItem("activeCurrency") == null) {
      localStorage.setItem("activeCurrency", "EUR");
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.userService.activateAccount(this.token).subscribe(data => {
          this.toasterService.success(this.translate.data["account.activated"], '', {
            positionClass: 'toast-bottom-right'
          });
          setTimeout(() => {
            this.router.navigate(['']);
          }, 3000);
         
        },
          error => {
            if (error.error =="account already activated") {
              this.toasterService.warning(this.translate.data["account.already.activated"], '', {
                positionClass: 'toast-bottom-right'
              });
            } else {
              this.toasterService.error(this.translate.data["account.activation.error"], '', {
                positionClass: 'toast-bottom-right'
              });
            }
          })

      }
    });
  }

}

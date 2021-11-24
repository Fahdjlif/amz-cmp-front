import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators, FormControl } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { User } from '../model/models';
import { CommonService } from '../common.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  loading = false;
  submitted = false;
  error:string ="";
  constructor(private userService: UserServiceService,private commonService : CommonService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.form.controls["email"].setValidators([Validators.required, Validators.email]);
    this.form.controls["password"].setValidators([Validators.required]);
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    let user = { email: this.form.controls.email.value, password: this.form.controls.password.value } as User;
    this.loading = true;
    this.userService.login(user).subscribe(
      data => {
         localStorage.setItem("userId",data.userId);
         this.commonService.isLoggedIn = true;
         this.commonService.token = data.token;
         this.commonService.role = data.authorities["0"];
         this.commonService.idUser = data.userId;
         this.commonService.email = data.userEmail;
         this.commonService.isUserLoggedIn.next(true);    
         localStorage.setItem("token",data.token);
         localStorage.setItem("firstName",data.firstName);
         localStorage.setItem("lastName",data.lastName);
         $('.modal').hide();
         $('.modal-backdrop').hide()
         this.spinner.hide();
      },
      error => {
        console.log(error)
        if (error.error.message=="Invalid username/password supplied"
        ) {
          this.loading = false;
          this.error="Invalid username/password supplied";

        }
        this.spinner.hide();
      })
  }

}

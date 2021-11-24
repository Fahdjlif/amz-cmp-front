import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '../translate.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $ : any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  firstName:string ="";
  lastName:string ="";
  registerForm: FormGroup;
  submitted = false;
  success =false;
  error:string ="";
  constructor(private formBuilder: FormBuilder, private userService:UserServiceService,
    private toasterService:ToastrService,private translate: TranslateService,private spinner: NgxSpinnerService)  {
    if (localStorage.getItem("firstName") && localStorage.getItem("lastName")) {
      this.firstName= localStorage.getItem("firstName") ;
     this.lastName= localStorage.getItem("lastName");
    }
   }
   ngOnInit() {
    this.registerForm = this.formBuilder.group({
       
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPasswordConfirmation: ['', Validators.required]
    }, {
        validator: this.MustMatch('newPassword', 'newPasswordConfirmation')
    });
}

  
  

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.spinner.show();
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.spinner.hide();
      return;
    }
    let credentials = { oldPassword: this.registerForm.controls.oldPassword.value,
      newPassword: this.registerForm.controls.newPassword.value} ;

    this.userService.changePassword(credentials).subscribe(
      data => {
        this.success=true;
        this.resetForm();
        localStorage.setItem("token",data.token)
        this.toasterService.success(this.translate.data["password.changed.success"], '', {
          positionClass: 'toast-bottom-right' 
       });
       this.spinner.hide();
      },
      error => {
        console.log(error)
        if (error.error.message=="Invalid username/password supplied") {
          this.error=this.translate.data["message.old.password.wrong"];
        }
        this.spinner.hide();
        

      }) 
  }
  resetForm() {
    this.error="";
  setTimeout(() => {
         
      $('.modal').hide();
      $('.modal-backdrop').hide();
      this.success=false;
    }, 10000);

  
}
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
  
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
  
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }




}

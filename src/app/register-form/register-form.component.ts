import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../model/models';
import { UserServiceService } from '../user-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  success =false;
  error:string ="";
  constructor(@Inject(LOCALE_ID) public locale: string,private formBuilder: FormBuilder,
   private userService:UserServiceService,private spinner: NgxSpinnerService) { }
  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
      }, {
          validator: this.MustMatch('password', 'confirmPassword')
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
    let user = { email: this.registerForm.controls.email.value, password: this.registerForm.controls.password.value,firstName:this.registerForm.controls.firstName.value,lastName:this.registerForm.controls.lastName.value } as User;

    this.userService.registerUser(user,this.locale).subscribe(
      data => {
        this.success=true;
        
        this.resetForm();
        this.spinner.hide();
      },
      error => {
        if (error.error.message=="email used") {
          this.error="email address already registred";
        }else if(error.error.message=="wrong mail address"){
          this.error="invalid mail address";
        }
        this.spinner.hide();

      }) 
  }
  resetForm() {
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
            // return if another validator has already found an error on the matchingControl
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

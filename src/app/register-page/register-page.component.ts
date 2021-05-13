import { Component, OnInit } from '@angular/core';
import { RootService } from '../root.service'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  authForm:any = FormGroup;
  successMsg:any;
  constructor(private root: RootService) {
    this.authForm = new FormGroup({
    email: new FormControl(null, Validators.email),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cnfpass: new FormControl(null)
    });

    this.authForm.controls.password.valueChanges.subscribe(
      () => this.authForm.cnfpass.updateValueAndValidity()
    );
  }

  ngOnInit() {

  }

  isValid(controlName:any){
    return this.authForm.get(controlName).invalid && this.authForm.get(controlName).touched;
  }

  passValidator(control: AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if(passControl){
        const passValue = passControl.value;
        if(passValue !== cnfpassValue || passValue === ''){
          return {
            isError:true
          };
        }
      }
    }
    return null;
  }


  register(){
    console.log("authForm", this.authForm.value)
    this.root.registerUser(this.authForm.value).subscribe(
      data => this.successMsg = "Registration Success",
      err => this.successMsg = "Could not register"
    );
  }
}

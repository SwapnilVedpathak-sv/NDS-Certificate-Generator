import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RootService } from '../root.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm:any = FormGroup;

  constructor(private root: RootService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {}

  isValid(controlName:any){
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  loginUser(){
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this.root.loginUser(this.loginForm.value).subscribe(data => {
        console.log(data)
        localStorage.setItem("token", data.toString())
      },
      error => {
        console.log("something went wrong")
      });
    }
  }

  // isFieldInvalid(field: string) {
  //   return (
  //     (!this.form.get(field).valid && this.form.get(field).touched) ||
  //     (this.form.get(field).untouched && this.formSubmitAttempt)
  //   );
  // }

}

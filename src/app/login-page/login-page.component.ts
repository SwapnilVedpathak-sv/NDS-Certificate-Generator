import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RootService } from '../root.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm:any = FormGroup;
  collections:any= [];

  constructor(private root: RootService, private router:Router) {
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
      this.root.loginUser(this.loginForm.value)
      .pipe(first())
      .subscribe(data => {
        console.log("Ran", data);
        this.collections = data;
        console.log("DID", this.collections.token)
        localStorage.setItem("token", this.collections.token.toString())
        this.router.navigate(['home']);
      },
        error => {
          // this.loading = false;
          console.log(error);
          // console.log("error", error.error.error);
          // this.errorMsg = error.error.error
        });
      // this.root.loginUser(this.loginForm.value).subscribe(data => {
      //   console.log(data)
      //   // let getData = JSON.parse(JSON.stringify(data.token))
      //   // let getData = data.json();
      //   // this.token = data['token']
      //   console.log("data.token", data)
      //   localStorage.setItem("token", data.toString())
      // },
      // error => {
      //   console.log("something went wrong")
      // });
    }
  }
}

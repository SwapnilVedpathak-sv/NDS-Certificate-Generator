import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(public http: HttpClient) { }

  readonly baseURL = ''
  readonly getAllCertificate = '/ndsCertificateData'
  readonly register = '/register'
  readonly login = '/login'

  getList(){
    return this.http.get(`${this.baseURL}${this.getAllCertificate}`)
   }

   registerUser(body:any){
      return this.http.post(`${this.baseURL}${this.register}`, body, {
        observe:'body'
      })
   }

   loginUser(body:any){
      return this.http.post(`${this.baseURL}${this.login}`, body, {
        observe:'body'
      })
   }
  }

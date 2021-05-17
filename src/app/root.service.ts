import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(public http: HttpClient) { }

  readonly baseUrl = 'http://localhost:8000'
  readonly getAllCertificate = '/ndsCertificateData'
  readonly register = '/register'
  readonly login = '/login'

  getList(){
    return this.http.get(`${this.baseUrl}${this.getAllCertificate}`)
   }

   registerUser(body:any){
      return this.http.post(`${this.baseUrl}${this.register}`, body, {
        observe:'body'
      })
   }

   loginUser(body:any){
      return this.http.post(`${this.baseUrl}${this.login}`, body, {
        observe:'body'
      })
   }
  }

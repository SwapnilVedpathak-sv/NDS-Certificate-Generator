import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(public http: HttpClient) { }

  getList(){
    return this.http.get(`http://localhost:8000/ndsCertificateData`)
   }

   registerUser(body:any){
      return this.http.post('http://localhost:8000/register', body, {
        observe:'body'
      })
   }
  }

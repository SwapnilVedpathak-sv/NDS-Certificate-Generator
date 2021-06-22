import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RootService {
  constructor(public http: HttpClient) {}

  readonly baseUrl = '';
  readonly AllCertificate = '/ndsCertificateData';
  readonly register = '/registerUser';
  readonly login = '/loginUser';

  getList() {
    return this.http.get(`${this.baseUrl}${this.AllCertificate}`);
  }

  registerUser(body: any) {
    return this.http.post(`${this.baseUrl}${this.register}`, body, {
      observe: 'body',
    });
  }

  loginUser(body: any) {
    return this.http.post(`${this.baseUrl}${this.login}`, body, {
      observe: 'body',
    });
  }

  saveCalibrationCertificate(body: any) {
    return this.http.post(`${this.baseUrl}${this.AllCertificate}`, body);
  }

  getCurrentCertificate(id:any){
    return this.http.get(`${this.baseUrl}${this.AllCertificate}/${id}`)
  }

  updateCalibrationCertificate(id:any,data:any){
    return this.http.put(`${this.baseUrl}${this.AllCertificate}/${id}`,data)
  }

  deleteCertificate(id:any){
    return this.http.delete(`${this.baseUrl}${this.AllCertificate}/${id}`)
  }
}

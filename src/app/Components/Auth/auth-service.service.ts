import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url: string = "http://127.0.0.1:3333/"

  constructor(private httpclient: HttpClient) { }

  register(reg: any) {
    const nom_url = this.url + "register"
    return this.httpclient.post(nom_url, reg)
  }
  login(log: any) {
    const nom_url = this.url + "login"
    return this.httpclient.post(nom_url, log)
  }
  getUser() {
    const token=localStorage.getItem("token")


    const tokenHeader=new HttpHeaders({
      'Authorization':'Bearer '+ token
    })


    const nom_url = this.url + "getuser"
    return this.httpclient.get(nom_url,{headers:tokenHeader})
  }
}

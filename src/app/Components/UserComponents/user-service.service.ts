import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url:string="http://127.0.0.1:3333/"

  constructor(private userclient:HttpClient) { }

  getProducts(){
    const nom_url=this.url+"getprods"
    return this.userclient.get(nom_url)
  }
  BuyProducts(prod:any){
    const nom_url=this.url+"crtmktcar"
    return this.userclient.post(nom_url,prod)
  }
  getMarketCar(id:any):Observable<any>{
    return this.userclient.get<any>(`http://127.0.0.1:3333/getmk/${id}`)
  }
  getTotMK(id:any){
    return this.userclient.get(`http://127.0.0.1:3333/gettotmk/${id}`)
  }
  DelProdToCar(id:any){
    return this.userclient.delete(`http://127.0.0.1:3333/delprodoncar/${id}`)
  }
  createOrder(ord:any):Observable<any>{
    const nom_url=this.url+"crtorder"
    return this.userclient.post<any>(nom_url,ord)
  }
  createOrderDetail(odt:any){
    const nom_url=this.url+"crtod"
    return this.userclient.post(nom_url,odt)
  }
  getLastOrder(id:any):Observable<any>{
    return this.userclient.get<any>(`http://127.0.0.1:3333/lstorder/${id}`)
  }
}

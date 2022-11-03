import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { UserServiceService } from '../user-service.service';
import Swal from 'sweetalert2'
import { interval } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private prodservice:UserServiceService,private alternservice:AuthServiceService,private router:Router) { }

  products:any[]|undefined

  prod={
    "prod_id":'',
    "user_id":'',
    "quantity":''
  }

  FormCar=new FormGroup({
    cantidad:new FormControl("",)
  })

  ngOnInit(): void {
    this.prodservice.getProducts().subscribe((data:any)=>{
      this.products=data
    })
  }

  

  SendProdsToCar(id:any,price:any){
    this.alternservice.getUser().subscribe((user:any)=>{
      console.log(user)
      const MyData={
        'user_id':user.id,
        'prod_id':id,
        'quantity':this.buy['cantidad'].value,
        'total':this.buy['cantidad'].value*price
      }
      this.prodservice.BuyProducts(MyData).subscribe((prod:any)=>{
        this.prod=prod
      })
      })
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto Agregado',
        showConfirmButton: false,
        timer: 3000
      })
      const contador=interval(2000)
      contador.subscribe(()=>{
        location.reload()
      })
    
   
  }

  get buy():{[key:string]:AbstractControl}{return this.FormCar.controls}
}

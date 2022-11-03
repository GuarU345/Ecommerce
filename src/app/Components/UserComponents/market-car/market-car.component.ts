import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-market-car',
  templateUrl: './market-car.component.html',
  styleUrls: ['./market-car.component.css']
})
export class MarketCarComponent implements OnInit {

  constructor(private carservice: UserServiceService, private alternservice: AuthServiceService) { }

  prodcars = {
    "market_id":'',
    "image":'',
    "product_name":'',
    "price":'',
    "quantity":'',
    "product_id": '',
    "total": '',
    "stock": ''
  }

  lstorder={
    "order_id":''
  }


  product = {
    market_id: '',
    prod_id: '',
    user_id: '',
    total: '',
    quantiy: ''
  }

  order = {
    order_id: '',
    date: '',
    user_id: ''
  }

  odetail = {
    ord_id: '',
    prod_id: '',
    total: '',
    buy_quantity: ''
  }

  prodtot = {
    "total": ''
  }

  ngOnInit(): void {
    this.alternservice.getUser().subscribe((user: any) => {
      this.carservice.getMarketCar(user.id).subscribe((car: any) => {
        this.prodcars = car
      })
      this.carservice.getTotMK(user.id).subscribe((cartot: any) => {
        this.prodtot = cartot
        console.log(this.prodtot)
      })
    })
  }
  delProdInCar(id: any) {
    this.carservice.DelProdToCar(id).subscribe((del: any) => {
      this.product = del

    })
    Swal.fire(
      'Producto eliminado'
    )
    const contador = interval(2000)
    contador.subscribe(() => {
      location.reload()
    })

  }
  completeBuy() {
    this.alternservice.getUser().subscribe((user: any) => {
      const usern = {
        'user_id': user.id
      }
      this.carservice.createOrder(usern).subscribe((ord: any) => {
        this.order = ord
        const contador = interval(2000)
        contador.subscribe(() => {
          this.carservice.getLastOrder(user.id).subscribe((lst: any) => {
            this.lstorder = lst
            console.log(this.lstorder.order_id)
          })
        })
        // this.carservice.getMarketCar(user.id).subscribe((data: any) => {
        //   this.prodcars = data
        //     const detail = {
        //       'ord_id': this.lstorder.order_id,
        //       'prod_id': this.prodcars.product_id,
        //       'total': this.prodcars.total,
        //       'buy_quantity': this.prodcars.quantity
        //     }
        //     this.carservice.createOrderDetail(detail).subscribe((pet: any) => {
        //       this.odetail = pet
        //   })
        // })
      })
    })
    Swal.fire(
      'Compra Realizada',
      'su compra se realizo satisfactoriamente',
      'success'
    )
  }
}

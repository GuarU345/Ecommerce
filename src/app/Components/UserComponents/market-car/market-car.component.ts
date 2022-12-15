import { Component, OnInit,Inject } from '@angular/core';
import { interval } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { User } from '../../Models/user';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from "../../dialogo-confirmacion/dialogo-confirmacion.component"
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-market-car',
  templateUrl: './market-car.component.html',
  styleUrls: ['./market-car.component.css'],
})
export class MarketCarComponent implements OnInit {
  constructor(
    private carservice: UserServiceService,
    private alternservice: AuthServiceService,
    public dialogo: MatDialog
  ) {}

  prodtot = [];

  prodtotfin = {
    'sum(`total`)': '',
  };

  prodcars: any[] | undefined;

  lstorder = {
    order_id: '',
  };

  product = {
    market_id: '',
    prod_id: '',
    user_id: '',
    total: '',
    quantiy: '',
  };

  order = {
    order_id: '',
    date: '',
    user_id: '',
  };

  odetail = {
    ord_id: '',
    prod_id: '',
    total: '',
    buy_quantity: '',
  };

  mostrarDialogo(id:any): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `Seguro que deseas eliminar este producto del carrito?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
         this.delProdInCar(id)
        } else {
          !this.mostrarDialogo
        }
      });
  }


  public carritovacio: boolean = false;

  getUser(userlog:any){
    this.alternservice.getUser().subscribe((user: any) => {
       userlog=user.id
       return userlog
    })
  }

 
  ngOnInit(): void {
    this.alternservice.getUser().subscribe((user: any) => {
      this.carservice.getMarketCar(user.id).subscribe((car: any) => {
        this.prodcars = car;
        if (!this.prodcars?.length) {
          this.carritovacio = true;
          Swal.fire('El carrito esta vacio');
        }
      });
      this.carservice.getTotMK(user.id).subscribe((cartot: any) => {
        this.prodtot = cartot;
        this.prodtotfin = this.prodtot[0];
      });
    });
  }

  delProdInCar(id: any) {
    Swal.fire({
      title: 'Seguro que deseas eliminarlo del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carservice.DelProdToCar(id).subscribe((del: any) => {
          this.product = del;
        });
        Swal.fire('Producto eliminado');
        const contador = interval(2000);
        contador.subscribe(() => {
          location.reload();
        });
      }
    })
  }

  completeBuy() {
    Swal.fire({
      title: 'realizar compra?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmar compra'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alternservice.getUser().subscribe((user: any) => {
          const usern = {
            user_id: user.id,
          };
          this.carservice.createOrder(usern).subscribe((ord: any) => {
            this.order = ord;
          });
          setTimeout(() => {
            this.carservice.getLastOrder(user.id).subscribe((lst: any) => {
              this.lstorder = lst;
            });
          }, 3000);
          setTimeout(() => {
            this.carservice.getMarketCar(user.id).subscribe((data: any) => {
              this.prodcars = data;
              this.prodcars?.forEach((item) => {
                const detail = {
                  ord_id: this.lstorder,
                  prod_id: item.product_id,
                  total: item.total,
                  buy_quantity: item.quantity,
                };
                this.carservice.createOrderDetail(detail).subscribe((pet: any) => {
                  this.odetail = pet;
                });
              });
            });
            Swal.fire(
              'Compra Realizada',
              'su compra se realizo satisfactoriamente',
              'success'
            );
          }, 5000);
        });
      }
    })
    
  }
}

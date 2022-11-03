import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from './Components/Auth/auth-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/UserComponents/products/products.component';
import { MarketCarComponent } from './Components/UserComponents/market-car/market-car.component';
import { UserServiceService } from './Components/UserComponents/user-service.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductsComponent,
    MarketCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthServiceService,
    UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

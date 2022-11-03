import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Models/user';
import { FormControl, FormGroup,AbstractControl } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { token } from '../../Models/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private logservice:AuthServiceService,private router:Router) { }

  user={
    "email":'',
    "password":''
  }
  

  LoginForm=new FormGroup({
    email:new FormControl(null,),
    password:new FormControl(null,)
   })
  
  ngOnInit(): void {
  }

  login(){
    const MyLogin={
      'email':this.log['email'].value,
      'password':this.log['password'].value
    }
    this.logservice.login(MyLogin).subscribe((log:token)=>{
        localStorage.setItem("token",log.token)
        alert("sesion iniciada correctamente")
    })
    this.router.navigate(['/home'])
  }
  get log():{[key:string]:AbstractControl}{return this.LoginForm.controls}
}

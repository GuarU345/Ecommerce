import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Models/user';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private regservice:AuthServiceService,private router:Router) { }

  user:User={
    "username":'',
    "email":'',
    "password":''
  }

  RegisterForm=new FormGroup({
    username:new FormControl("",),
    email:new FormControl("",),
    password:new FormControl("",)
   })

  ngOnInit(): void {
  }

  register(){
    const MyReg={
      'username':this.reg['username'].value,
      'email':this.reg['email'].value,
      'password':this.reg['password'].value
    }
    this.regservice.register(MyReg).subscribe((reg:any)=>{
      this.user=reg
      console.log(MyReg)
    })
  }

  
  get reg():{[key:string]:AbstractControl}{return this.RegisterForm.controls}
}

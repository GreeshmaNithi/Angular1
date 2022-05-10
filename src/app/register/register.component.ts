import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../sevices/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username=""
  accountno=""
  password=""

  //register group model creation
  registerForm=this.fb.group({
    //form array creation
    accountno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]]
    
  })

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }
  // constructor(private ds:DataService){ }

  ngOnInit(): void {
  }

  register()
  {
    // console.log(this.registerForm.get('username')?.errors);
    
    // alert("register clicked")

    var acno=this.registerForm.value.accountno
    var password=this.registerForm.value.password
    var username=this.registerForm.value.username

    if(this.registerForm.valid)
    {
      //asynchronous
      this.ds.register(acno,password,username)
      .subscribe((result : any)=>{
        if(result)
        {
          alert(result.message)
          this.router.navigateByUrl("")
        }
      },(result)=>
      {
        alert(result.error.message)
      })

    // if(result)
    // {
    //   alert("register successfully")
     

    // }
    // else
    // {
    //   alert("user already exist")
    // }
    }
    else{
      alert("invalid form")
    }


    



    // let database=this.ds.database

    
  }

}

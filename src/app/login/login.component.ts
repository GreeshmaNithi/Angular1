import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../sevices/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim="Your Perfect Babking Partner"
  accno="Account Number Please"
  acno=""
  pswd=""


  //login group model creation
  loginForm=this.aa.group(
    //form array creation
    {
      acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    }
  )

  database:any={
    1000:{acno:1000,uname:"Neer",password:1000,balance:5000},
    1001:{acno:1001,uname:"malu",password:1001,balance:5000},
    1002:{acno:1002,uname:"nithi",password:1002,balance:5000}

  }

  constructor(private router:Router,private ds:DataService,private aa:FormBuilder) { }

  ngOnInit(): void {
  }

//acnoChange
acnoChange(event:any)
{
  this.acno=event.target.value;
  console.log(this.acno);
  
  
}

//pswdChange
pswdChange(event:any)
{
  this.pswd=event.target.value;
  console.log(this.pswd);
}

//login using template reference variable
//   login(a:any,p:any)
//   {
//     console.log(a);
    
//     // alert("Login clicked!!!!")
//     var acno=a.value
//     var pswd=p.value
    
//     let database=this.database;
//     if(acno in this.database)
//     {

//       if(pswd==database[acno]["password"])
//       {
//         alert("login successful")
//       }
//       else{
//         alert("incorrect password")
//       }
//     }
//     else
//     {
//       alert("user does not exist")
//     }
//   }

  
// }
  //login
  login()
  {
    // alert("Login clicked!!!!")
    var acno=this.loginForm.value.acno;
    var pswd=this.loginForm.value.pswd;
    
    if(this.loginForm.valid)
    {
      //asynchrounous call-login
      this.ds.login(acno,pswd)
      .subscribe((result : any)=>
      {
        if(result)
        {
          localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
          localStorage.setItem('currentUname',JSON.stringify(result.currentUname))
          localStorage.setItem('token',JSON.stringify(result.token))
          alert(result.message)
          this.router.navigateByUrl("dashboard")

        }
      },
      (result)=>{
        alert(result.error.message)
      })
      // if(result)
      // {
      //   alert("login successful")
      //   this.router.navigateByUrl("dashboard")
      // }


    }
    else{
      alert("invalid form")
    }
    // let database=this.ds.database;
    // if(acno in this.ds.database)
    

      // if(pswd==database[acno]["password"])
     
    //   else{
    //     alert("incorrect password")
    //   }
    // }
    // else
    // {
    //   alert("user does not exist")
    }
  

  

}

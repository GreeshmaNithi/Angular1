import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../sevices/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:any
  lDate:any
  accno:any

  acno=""
  pswd=""
  Amount=""

  acno1=""
  pswd1=""
  Amount1=""

  depositForm=this.dd.group(
    {
      acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
      Amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
    }
  )

  withdrawForm=this.ww.group(
    {
      acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
      Amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]
    }
  )


  constructor(private ds:DataService,private dd:FormBuilder,private ww:FormBuilder,private router:Router) {
    // this.user=this.ds.currentUname
    if(localStorage.getItem('currentUname'))
    {
      this.user = JSON.parse(localStorage.getItem('currentUname')||'')
    }
   

    this.lDate = new Date()
   }

  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno"))
    {
      alert("please login")
      this.router.navigateByUrl("")
    }
  }

  deposit()
  {
    alert("successful")


    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amount=this.depositForm.value.Amount

    if(this.depositForm.valid)
    {
      //calling deposit function of dataservice - asynchronous
      this.ds.deposit(acno,pswd,amount)
      .subscribe((result:any)=>
      {
        if(result)
        {
          alert(result.message)
        }
      },
      (result)=>
      {
        alert(result.error.message)
      })
      // if(result)
      // {
      //   alert(amount+"successfully deposit....and new balance is"+ result)
      // }
    }
    else
    {
      alert("invalid form")
    }
    }

    //calling depositfunction of dataservice
   

  withdraw()
  {
    alert("successfully withdrawed")


    var acno=this.withdrawForm.value.acno1
    var pswd=this.withdrawForm.value.pswd1
    var amount=this.withdrawForm.value.Amount1


    if(this.withdrawForm.valid)
    {
      //asynchronous 
      this.ds.withdraw(acno,pswd,amount)
      .subscribe((result:any)=>
      {
        if(result)
        {
          alert(result.message)
        }
      },
      (result)=>
      {
        alert(result.error.message)
      })
    // if(result)
    // {
    //   alert(amount+"successfully debit....and new balance is"+result)
    // }
    }
    else
    {
      alert("invalid form")
    }
    
    //calling withdraw function  of dataservice
   
  }

  //logout
  logout()
  {
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
    this.router.navigateByUrl("")
  }

  deleteAccount()
  {
    this.accno=JSON.parse(localStorage.getItem("currentAcno")||'')
  }
  cancel()
  {
    this.accno=""
  }
  delete(event:any)
  {
    // alert("delete account "+event+"from parent")
    //asynchronous
    this.ds.delete(event)
    .subscribe((result : any)=>
    {
      if(result)
      {
        alert(result.message)

        localStorage.removeItem("currentAcno")
        localStorage.removeItem("currentUname")
        this.router.navigateByUrl("token")
        this.router.navigateByUrl("")
      }
    },(result)=>
    {
      alert(result.error.message)
    })

    // this.router.navigateByUrl("")
  }
}

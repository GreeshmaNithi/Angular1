import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options = {
  headers : new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentAcno:any
  currentUname:any

  database:any={
    1000:{acno:1000,uname:"Neer",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,uname:"malu",password:1001,balance:5000,transaction:[]},
    1002:{acno:1002,uname:"nithi",password:1002,balance:5000,transaction:[]}

  }


  constructor(private http : HttpClient) { 
    // this.getData()
  }



  //to store data in local storage
  storeData()
  {
    localStorage.setItem("databaseNew",JSON.stringify(this.database))
    if(this.currentAcno)
    {
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))

    }

    if(this.currentUname)
    {
      localStorage.setItem("currentUname",JSON.stringify(this.currentUname))
      
    }
  }

  //to get data from local storage
  getData()
  {


    if(localStorage.getItem("databaseNew"))
    {
      this.database=JSON.parse(localStorage.getItem("databaseNew") || '') 

    }
    if(localStorage.getItem("currentAcno"))
    {
      this.currentAcno= JSON.parse(localStorage.getItem("currentAcno") || '')
    }

    if(localStorage.getItem("currentUname"))
    {
      this.currentUname= JSON.parse(localStorage.getItem("currentUname") || '')
    }
  }

//register
  register(acno:any,password:any,uname:any)
  {
    const data = {
      acno,password,uname
    }

   return this.http.post('http://localhost:3000/register',data)

    // let database=this.database

    // if(acno in this.database)
    // {
    //   return false
    // }
    // else
    // {
    //   database[acno]=
    //   {
    //     acno:acno,      //acno is in database name and accountno is in component name
    //     uname:uname,
    //     password:password,
    //     balance:0,
    //     transaction:[]
    //   }
    //   this.storeData()
    //   return true
    // }
  }




  //login
  login(acno:any,password:any)
  {

    //request body
    const data = {
      acno,password
    }

    //login api call
    return this.http.post('http://localhost:3000/login',data)

    // let database=this.database


    // if(acno in database)
    // {
    //   if(password==database[acno]["password"])
    //   {
    //     this.currentAcno=acno


    //     this.currentUname=database[acno]["uname"]
    //     this.storeData()
    //     return true
    //   }
    //   else
    //   {
    //     alert("incorrect password")
    //     return false
    //   }
    // }
    // else
    // {
    //   alert("user doesnot exist....")
    //   return false
    // }
  }

  //deposit

  deposit(acno:any,password:any,amt:any)
  {
    //request body
    const data = {
      acno,
      password,
      amt
    }
   




    //deposit api call
    return this.http.post('http://localhost:3000/deposit',data,this.getOptions())

    // var amount =parseInt(amt)
    // let database=this.database

    // if(acno in database)
    // {

    //   if(pswd==database[acno]["password"])
    //   {
    //     // database[acno]["balance"]+=amt
    //     database[acno]["balance"]+=amount


    //     database[acno]["transaction"].push(
    //     {
    //       amt:amt,
    //       type:"CREDIT"
    //     }
    //     )
    //     console.log(database);
    //     this.storeData()
        
    //     return database[acno]["balance"]
    //   }
    //   else
    //   {
    //     alert("incorrect password")
    //     return false
    //   }
    // }
    // else
    // {
    //   alert("user does not exist")
    //   return false
    // }
  }
  //to add token in rqst header
  getOptions()
  {
     //token fetch from local storage
     const token = JSON.parse (localStorage.getItem('token')||'')
     //create reqst header 
     let headers = new HttpHeaders()
     if(token)
     {
       headers = headers.append('x-access-token',token)
       options.headers=headers
     }
     return options
  }

  //withdraw

  withdraw(acno:any,password:any,amt:any)
  {
    //request body
    const data = {
      acno,
      password,
      amt
    }

     //withdraw api call
     return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())

    // var amount =parseInt(amt)
    // let database=this.database

    // if(acno in database)
    // {

    //   if(pswd==database[acno]["password"])
    //   {

    //     if(database[acno]["balance"]>amt)
    //     {
    //       database[acno]["balance"]-=amount
    //       database[acno]["transaction"].push(
    //         {
    //           amt:amt,
    //           type:"DEBIT"
    //         }
    //         )
    //         console.log(database);
    //         this.storeData()

    //       return database[acno]["balance"]
    //     }
    //     else
    //     {
    //       alert("insuffucient balance")
    //       return false
    //     }

    //     // database[acno]["balance"]+=amt
    //     // return database[acno]["balance"]
    //   }
    //   else
    //   {
    //     alert("incorrect password")
    //     return false
    //   }
    // }
    // else
    // {
    //   alert("user does not exist")
    //   return false
    // }
  }

  //transaction history

  getTransaction(acno:any)
  {
    //request body
    const data = {
      acno 
    }

     //transaction api call
     return this.http.post('http://localhost:3000/transaction',data,this.getOptions())

    // return this.database[acno]["transaction"]
  }

//delete accont
delete(acno : any)
{
  //delete accnt api
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())
}

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from '../adminPages/list-of-users/list-of-users.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  connected=false; role:string;
  constructor(private http:HttpClient,private router: Router) { }
  
  login(password:string){
    if(password==="adminPass"){
      console.log("t3ada");
      // this.router.navigate(['listOfUsers']);
      this.router.navigate(['listOfUsers'],{ queryParams: { userType: 'admin' } });
      this.loggedIn.next(true);
      this.connected=true; 
      this.role='admin';
    }
    if(password==="userPass"){
      this.router.navigate(['listOfUsers'],{ queryParams: { userType: 'user',userRole:'transformateur' } });
      this.loggedIn.next(true);
      this.connected=true; 
      this.role='user';
    }
    
  }
  logout(): void {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    this.connected=false;
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    this.connected=true;
    return this.loggedIn;
  }


  

//   usersData$ = new BehaviorSubject<any>(null);
//   cnx(){
//   this.http.get('http://localhost:5000/api/admin/users', this.httpOptions)
//   .subscribe(
//     (data) => {
//     const d=JSON.stringify(data)
//     this.usersData$.next(data);
//     console.log("data is ==="+this.usersData$);
//   },(error) => {
//   }

//   );
// }

cnx3(){
  console.log("cnx3--------------------")
  this.http.get('http://localhost:5000/api/admin/users', { responseType: 'text' }).subscribe(
    (response) => {
      // const message = JSON.parse(response).message;
      console.log(response);
      console.log("type de reponse ==="+typeof(response))
      return response;
    },
    (error) => {
      console.error(error);
    }
  );
}


hetlusers(){
  this.http.get('http://localhost:5000/api/admin/users', { responseType: 'text' }).subscribe(
    (response) => {
      // const message = JSON.parse(response).message;
      console.log(response);
      console.log("type de reponse ==="+typeof(response))
      
    },
    (error) => {
      console.log("fama hkeya mech heya")
      console.error(error);
    }
  );
}
users: User[] = [];
cnn4() {
  this.http.get('http://localhost:5000/api/admin/users',{ responseType: 'text' }).subscribe(
    (response) => {
      // this.users = response;
     let text=JSON.stringify(response)
      console.log("respone == text"+ text)
      let array=text.split('\n')
      console.log(" type howa "+typeof(array))
      let cleantext=text.replace("\n", " ").toUpperCase();
      console.log("newRes===="+cleantext)
      console.log(typeof(text))
      
      return JSON;
    },
    (error) => {
      console.error(error);
    }
  );
}

userData: User = {} as User;
cnx5() {
  console.log("cnx 5 executed")
  this.http.get<User>('http://localhost:5000/api/admin/users').subscribe(
    
    (response) => {
      this.userData = response;
  
      console.log("user data ===="+this.userData)
    },
    (error) => {
      console.error(error);
      console.log("fama haja");
    }
  );
}

public temchiBidhnallah(){
  this.http.get('http://localhost:5000/api/admin/users').subscribe(
    (response) => {
      let text = JSON.stringify(response);
      let users = JSON.parse(text); // convert string response to JSON object

console.log(users[0])
      console.log(users[0].name); // logs "iheb"
console.log(users[1].name); // logs "yassine"

      
      // extract values of specific fields
      // let cins = users.map((user: { cin: any; }) => user.cin); 
      // let names = users.map((user: { name: any; }) => user.name); 
      let names = users.map((user:any) => user.name);
      
      // console.log(cins); // log array of cins
      console.log(names); // log array of names
      return users;
    },
    (error) => {
      console.error(error);
    }
  );
}




public temchiBidhnallah2(): Observable<User[]> {
  return this.http.get<User[]>('http://localhost:5000/api/admin/users').pipe(
    map((response) => response.map((user) => ({ ...user, role: user.role as "admin" | "user" }))),
    
  );
}














// apiUrl='localhost:5000/api/admin/users';
// getUsers() {

  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQyYmEyMzA0ZWE5OWIwMjIyMjdmMTBlIiwicm9sZSI6ImFkbWluIiwiZXhwIjoyNTM0MDIyMTQ0MDB9.17tI_G0dL2LVdfEcY2m4DyvNd6_mV-d0YcJ7AWApPto'
  //   })
  // };
//   return this.http.get<any>(this.apiUrl, httpOptions);
 
// }

}

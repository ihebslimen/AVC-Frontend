import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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
      this.router.navigate(['listOfUsers'],{ queryParams: { userType: 'user' } });
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


}
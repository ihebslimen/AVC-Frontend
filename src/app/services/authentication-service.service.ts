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
      this.router.navigate(['listOfUsers'],{ queryParams: { userType: 'user',userRole:'agriculteur' } });
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


  showSectionHome: boolean = true;
  showSectionApropos: boolean = false;
  showSectionStarted: boolean =false;
  toggleSectionHome() {
    this.showSectionHome = true;
    this.showSectionApropos = false;
    this.showSectionStarted =false;
  }

  toggleSectionApropos() {
    this.showSectionHome = false;
    this.showSectionApropos = true;
    this.showSectionStarted =false;
  }

  showApropos() {
    this.showSectionHome = false;
    this.showSectionApropos = false;
    this.showSectionStarted = true;
  }

  
  

}

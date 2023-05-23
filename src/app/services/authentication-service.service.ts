import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from '../adminPages/list-of-users/list-of-users.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  connected=false; role:string;
  userTypeUpdated: EventEmitter<string> = new EventEmitter<string>();


  constructor(private http:HttpClient,private router: Router) { }
  setUserType(userType: string) {
    this.userTypeUpdated.emit(userType);
  }
  
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
      // this.router.navigate(['listOfUsers'],{ queryParams: { userType: 'user',userRole:'agriculteur' } });
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

users: User[] = [];

userData: User = {} as User;


getUserById(id:any){
  const url=`localhost:5000/api/admin/users/${id}`;
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2MzdlOGZmODI0NmQ0YzE2YTVhYzdkIiwicm9sZSI6ImFkbWluIiwicHVibGljX2tleSI6IjB4MDEyMDhkMmY0OWVjYWIxYTc0ZGJkOGVkOTIyNGFiMzdhMTA3NTg0OWVhMThlNGQzZDhjMThmNTY2NzFmNDdjNWM4NjJkNTFkYTAwM2IwMDFmZTZiZTE1NzU1YjZjZTAwZDkyZjE0ZTdlZGE1NzBmYTcxOWE4NmE5OGVlOWJiNGUiLCJwcml2YXRlX2tleSI6IjB4OGQ1ODJlMjNhMjU3NjUxZmYyZGUxYTI3Yjg3MWYwNzZjY2UwZWNmNDA2NTVlOGFiOTIxMDFjZGRmZThjMzMwNiIsImV4cCI6MjUzNDAyMjE0NDAwfQ.oBTL8QgfxY31ISZD520GPegU9K0qjm9nuM-Fe3_W5Pc"
    }`
  });
  return this.http.get(url,{headers});
  }
}

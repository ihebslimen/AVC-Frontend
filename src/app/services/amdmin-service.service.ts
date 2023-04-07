import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../adminPages/list-of-users/list-of-users.component';

@Injectable({
  providedIn: 'root'
})
export class AmdminServiceService {
  apiServerUrl: any;

  constructor(private http:HttpClient) { }
  public getUsers(){
  let users=this.http.get<any>("https://jsonplaceholder.typicode.com/users");
return users;
  }
  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/User/updatefou`,user);
  }
  
  public deleteUser(UserId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/User/deleted/${UserId}`);
  }

}

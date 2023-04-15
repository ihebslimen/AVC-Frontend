import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../adminPages/list-of-users/list-of-users.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmdminServiceService {
 
  private apiServerUrl = environment.apiServerUrl;
  constructor(private http:HttpClient) { }
  public getUsers(){
  let users=this.http.get<any>("https://jsonplaceholder.typicode.com/users");
return users;
  }

  public getUserid(id_user:number):Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/api/users/${id_user}`);
    } 
  public getUserss():Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/api/users`);
  }
  public addUsers(user:User):Observable<User>{
  return this.http.post<User>(`${this.apiServerUrl}/api/users`,user);
  }
  public deleteUser(userId: number): Observable<void> {
    console.log("user with the id "+userId+" has been removed" );
    return this.http.delete<void>(`${this.apiServerUrl}/api/users/${userId}`);
  }
  public updateUser(user: User,userId: number): Observable<User> {
    console.log("user with id "+user.id+" has been updated");
    return this.http.put<User>(`${this.apiServerUrl}/api/users/${userId}`,user);
  }

}

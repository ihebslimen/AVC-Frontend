import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AmdminServiceService {

  constructor(private http:HttpClient) { }
  public getUsers(){
  let users=this.http.get<any>("https://jsonplaceholder.typicode.com/users");
return users;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../adminPages/list-of-users/list-of-users.component';
import { Observable, map, toArray } from 'rxjs';
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

  // getUsersTemchi(): Observable<User[]> {
  //   const userArray: User[] = [];
  //   return this.http.get('http://localhost:5000/api/admin/users', { responseType: 'text' })
  //     .pipe(
  //       map((response: string) => {
  //         const jsonArray = JSON.parse(response);
  //         for (let i = 0; i < jsonArray.length; i++) {
  //           const user: User = {
  //             _id: jsonArray[i]._id,
  //             cin: jsonArray[i].cin,
  //             email: jsonArray[i].email,
  //             name: jsonArray[i].name,
  //             phone: jsonArray[i].phone,
  //             role: jsonArray[i].role
  //           };
  //           userArray.push(user);
  //         }
  //         return userArray;
  //       })
  //     );
  // }


 

  public getU(){
    return this.http.get<any>(`${this.apiServerUrl}/api/admin/users/`);
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
  // public deleteUser(userId: number): Observable<void> {
  //   console.log("user with the id "+userId+" has been removed" );
  //   return this.http.delete<void>(`${this.apiServerUrl}/api/users/${userId}`);
  // }
  // public updateUser(user: User,userId: number): Observable<User> {
  //   console.log("user with id "+user._id+" has been updated");
  //   return this.http.put<User>(`${this.apiServerUrl}/api/users/${userId}`,user);
  // }



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

   requestBody = {
    "cin": "099",
    "email": "aziz7@gmail.com",
    "name":"aziz",
    "phone":"25179375",
    "role":"user",
    "type":"agricole",
    "actorInfoJson":{"localisation": "soliman"}
    // Add more parameters as needed
  };


  ajouterUtilisateur(){
    this.http.post('http://localhost:5000/api/admin/users',this.requestBody).subscribe(
(Response)=>{
console.log("user added")
},
(error)=>{
  // console.error("a problem occured")
}
    );
  }

farmers:any=[];
  getAllFarmers(){
    this.http.get('localhost:5000/api/admin/agricoles');
  }


  getAgricoles(): Observable<any> {
    const url = 'http://localhost:5000/api/admin/agricoles';
    return this.http.get(url);
  }


  deleteAgricole(id:string){
    const url = `http://localhost:5000/api/admin/agricoles/${id}`;
    return this.http.delete(url);
  }
  
  deleteUser(id:string){
    const url = `localhost:5000/api/admin/users/${id}`;
    return this.http.delete(url);
  }


  deleteUser2(id: string): Observable<any> {
    const url = `http://localhost:5000/api/admin/users/${id}`;
    return this.http.delete(url);
  }

  updateUser(userId: string, payload: any) {
    const url = `http://localhost:5000/api/admin/users/${userId}`;
    return this.http.put(url, payload);
  }



  updateOffer(offerId: string, payload: any) {
    const url = `http://localhost:5000/api/admin/users/offers/${offerId}`;
    return this.http.put(url, payload);
  }



  getAllOffers(): Observable<any> {
    const url = "http://localhost:5000/api/user/offers";
    return this.http.get(url).pipe(
      map(response => {
        return response;
      })
    );
  }
}





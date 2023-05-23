import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../adminPages/list-of-users/list-of-users.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AmdminServiceService {
 
  private apiServerUrl = environment.apiServerUrl;
  constructor(private http:HttpClient) { }


  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQyYmEyMzA0ZWE5OWIwMjIyMjdmMTBlIiwicm9sZSI6ImFkbWluIiwiZXhwIjoyNTM0MDIyMTQ0MDB9.17tI_G0dL2LVdfEcY2m4DyvNd6_mV-d0YcJ7AWApPto'
    })
  };
  public temchiBidhnallah3(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:5000/api/admin/users', this.httpOptions);
  }
 


ajouterOffreAgriculteur(stockForm: any): Observable<any> {
    const payload = {
      quantity: stockForm.value['product-quantity'],
      quality: stockForm.value['product-quality'],
      priceUnit: stockForm.value['product-price'],
      unit: stockForm.value['product-unit'],
      state: stockForm.value['product-state'],
      actorType: stockForm.value['actor-type'],
      actorRef:"64662677013ecbe516a36fec"
    };
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2MzdlOGZmODI0NmQ0YzE2YTVhYzdkIiwicm9sZSI6ImFkbWluIiwicHVibGljX2tleSI6IjB4MDEyMDhkMmY0OWVjYWIxYTc0ZGJkOGVkOTIyNGFiMzdhMTA3NTg0OWVhMThlNGQzZDhjMThmNTY2NzFmNDdjNWM4NjJkNTFkYTAwM2IwMDFmZTZiZTE1NzU1YjZjZTAwZDkyZjE0ZTdlZGE1NzBmYTcxOWE4NmE5OGVlOWJiNGUiLCJwcml2YXRlX2tleSI6IjB4OGQ1ODJlMjNhMjU3NjUxZmYyZGUxYTI3Yjg3MWYwNzZjY2UwZWNmNDA2NTVlOGFiOTIxMDFjZGRmZThjMzMwNiIsImV4cCI6MjUzNDAyMjE0NDAwfQ.oBTL8QgfxY31ISZD520GPegU9K0qjm9nuM-Fe3_W5Pc';

    // Set the headers with authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2NGYwOWNjOGZlZDYxNjY0YjA4NWUyIiwicm9sZSI6InVzZXIiLCJwdWJsaWNfa2V5IjoiMHhiMzkzNDIyZjY0NWQxMTE5OWU1ZWM1YzRjZTk2YWIzYjA5NDhmMGQzMDM4NDJjMDU0YTUwZTEyYmU2ZjM0NWQwODdhNmZjMzY1Y2YyZmM4NDNhYWUyMmNiZjA4Njc4MzY1MjM5OTk5MmQ4ZTgxNDAxOTlkNWM3YjM5NzE5ZTE0OSIsInByaXZhdGVfa2V5IjoiMHgxZDI4MTBmYzliM2E2OTIwYjhkMjM5YjE2YzllZDk0ODQ4NzE1MjY3ODIwZjA5N2VkZWU4NWE3NTJlZjNkMzJiIiwiZXhwIjoyNTM0MDIyMTQ0MDB9.dZUSolvHV6Hb0byuAgWn8ErRHw4FWpTt0drQ6Dga4b8"
      }`
    });
    return this.http.post('http://localhost:5000/api/user/offers', payload, { headers }); 
}

updateOffer(offerId: string, payload: any) {
  const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2MzdlOGZmODI0NmQ0YzE2YTVhYzdkIiwicm9sZSI6ImFkbWluIiwicHVibGljX2tleSI6IjB4MDEyMDhkMmY0OWVjYWIxYTc0ZGJkOGVkOTIyNGFiMzdhMTA3NTg0OWVhMThlNGQzZDhjMThmNTY2NzFmNDdjNWM4NjJkNTFkYTAwM2IwMDFmZTZiZTE1NzU1YjZjZTAwZDkyZjE0ZTdlZGE1NzBmYTcxOWE4NmE5OGVlOWJiNGUiLCJwcml2YXRlX2tleSI6IjB4OGQ1ODJlMjNhMjU3NjUxZmYyZGUxYTI3Yjg3MWYwNzZjY2UwZWNmNDA2NTVlOGFiOTIxMDFjZGRmZThjMzMwNiIsImV4cCI6MjUzNDAyMjE0NDAwfQ.oBTL8QgfxY31ISZD520GPegU9K0qjm9nuM-Fe3_W5Pc';
  // Set the headers with authorization token
  const headers = new HttpHeaders({
      'Authorization': `Bearer ${
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2NGYwOWNjOGZlZDYxNjY0YjA4NWUyIiwicm9sZSI6InVzZXIiLCJwdWJsaWNfa2V5IjoiMHhiMzkzNDIyZjY0NWQxMTE5OWU1ZWM1YzRjZTk2YWIzYjA5NDhmMGQzMDM4NDJjMDU0YTUwZTEyYmU2ZjM0NWQwODdhNmZjMzY1Y2YyZmM4NDNhYWUyMmNiZjA4Njc4MzY1MjM5OTk5MmQ4ZTgxNDAxOTlkNWM3YjM5NzE5ZTE0OSIsInByaXZhdGVfa2V5IjoiMHgxZDI4MTBmYzliM2E2OTIwYjhkMjM5YjE2YzllZDk0ODQ4NzE1MjY3ODIwZjA5N2VkZWU4NWE3NTJlZjNkMzJiIiwiZXhwIjoyNTM0MDIyMTQ0MDB9.dZUSolvHV6Hb0byuAgWn8ErRHw4FWpTt0drQ6Dga4b8"
      }`
    });
  const url = `http://localhost:5000/api/user/offers/${offerId}`;
  return this.http.put(url, payload,{headers});
}
 
  


   requestBody = {
    "cin": "10376529",
    "name":"firas",
    "email": "firas7000@gmail.com",
    "phone":"+21699123576",
    "role":"user",
    "state":"waiting",
    "type":"agricole",
    "actorInfoJson":{"localisation": "bizerte"}
    // Add more parameters as needed
  };
  


  ajouterUtilisateur(requestBodyFromForm:any): Observable<any> {
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2MzdlOGZmODI0NmQ0YzE2YTVhYzdkIiwicm9sZSI6ImFkbWluIiwicHVibGljX2tleSI6IjB4MDEyMDhkMmY0OWVjYWIxYTc0ZGJkOGVkOTIyNGFiMzdhMTA3NTg0OWVhMThlNGQzZDhjMThmNTY2NzFmNDdjNWM4NjJkNTFkYTAwM2IwMDFmZTZiZTE1NzU1YjZjZTAwZDkyZjE0ZTdlZGE1NzBmYTcxOWE4NmE5OGVlOWJiNGUiLCJwcml2YXRlX2tleSI6IjB4OGQ1ODJlMjNhMjU3NjUxZmYyZGUxYTI3Yjg3MWYwNzZjY2UwZWNmNDA2NTVlOGFiOTIxMDFjZGRmZThjMzMwNiIsImV4cCI6MjUzNDAyMjE0NDAwfQ.oBTL8QgfxY31ISZD520GPegU9K0qjm9nuM-Fe3_W5Pc';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:5000/api/admin/users',requestBodyFromForm, { headers });

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
  

  deleteUser2(id: string): Observable<any> {

    const url = `http://localhost:5000/api/admin/users/${id}`;
    return this.http.delete(url,this.httpOptions);
  }

  updateUser(userId: string, updateData: any) {
  const url = `http://localhost:5000/api/admin/users/${userId}`;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2MzdlOGZmODI0NmQ0YzE2YTVhYzdkIiwicm9sZSI6ImFkbWluIiwicHVibGljX2tleSI6IjB4MDEyMDhkMmY0OWVjYWIxYTc0ZGJkOGVkOTIyNGFiMzdhMTA3NTg0OWVhMThlNGQzZDhjMThmNTY2NzFmNDdjNWM4NjJkNTFkYTAwM2IwMDFmZTZiZTE1NzU1YjZjZTAwZDkyZjE0ZTdlZGE1NzBmYTcxOWE4NmE5OGVlOWJiNGUiLCJwcml2YXRlX2tleSI6IjB4OGQ1ODJlMjNhMjU3NjUxZmYyZGUxYTI3Yjg3MWYwNzZjY2UwZWNmNDA2NTVlOGFiOTIxMDFjZGRmZThjMzMwNiIsImV4cCI6MjUzNDAyMjE0NDAwfQ.oBTL8QgfxY31ISZD520GPegU9K0qjm9nuM-Fe3_W5Pc';

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.put(url, updateData, { headers });
}

  
adminToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2MzdlOGZmODI0NmQ0YzE2YTVhYzdkIiwicm9sZSI6ImFkbWluIiwicHVibGljX2tleSI6IjB4MDEyMDhkMmY0OWVjYWIxYTc0ZGJkOGVkOTIyNGFiMzdhMTA3NTg0OWVhMThlNGQzZDhjMThmNTY2NzFmNDdjNWM4NjJkNTFkYTAwM2IwMDFmZTZiZTE1NzU1YjZjZTAwZDkyZjE0ZTdlZGE1NzBmYTcxOWE4NmE5OGVlOWJiNGUiLCJwcml2YXRlX2tleSI6IjB4OGQ1ODJlMjNhMjU3NjUxZmYyZGUxYTI3Yjg3MWYwNzZjY2UwZWNmNDA2NTVlOGFiOTIxMDFjZGRmZThjMzMwNiIsImV4cCI6MjUzNDAyMjE0NDAwfQ.oBTL8QgfxY31ISZD520GPegU9K0qjm9nuM-Fe3_W5Pc'

  userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2NGYwOWNjOGZlZDYxNjY0YjA4NWUyIiwicm9sZSI6InVzZXIiLCJwdWJsaWNfa2V5IjoiMHhiMzkzNDIyZjY0NWQxMTE5OWU1ZWM1YzRjZTk2YWIzYjA5NDhmMGQzMDM4NDJjMDU0YTUwZTEyYmU2ZjM0NWQwODdhNmZjMzY1Y2YyZmM4NDNhYWUyMmNiZjA4Njc4MzY1MjM5OTk5MmQ4ZTgxNDAxOTlkNWM3YjM5NzE5ZTE0OSIsInByaXZhdGVfa2V5IjoiMHgxZDI4MTBmYzliM2E2OTIwYjhkMjM5YjE2YzllZDk0ODQ4NzE1MjY3ODIwZjA5N2VkZWU4NWE3NTJlZjNkMzJiIiwiZXhwIjoyNTM0MDIyMTQ0MDB9.dZUSolvHV6Hb0byuAgWn8ErRHw4FWpTt0drQ6Dga4b8';

  getAllOffers(): Observable<any> {
    const url = "http://localhost:5000/api/user/offers";
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userToken}`
    });
    return this.http.get(url, { headers }).pipe(
      map(response => {
        return response;
      })
    );
  }

  deleteOffer(offerId: string) {
    // Set the headers with authorization token
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2NGYwOWNjOGZlZDYxNjY0YjA4NWUyIiwicm9sZSI6InVzZXIiLCJwdWJsaWNfa2V5IjoiMHhiMzkzNDIyZjY0NWQxMTE5OWU1ZWM1YzRjZTk2YWIzYjA5NDhmMGQzMDM4NDJjMDU0YTUwZTEyYmU2ZjM0NWQwODdhNmZjMzY1Y2YyZmM4NDNhYWUyMmNiZjA4Njc4MzY1MjM5OTk5MmQ4ZTgxNDAxOTlkNWM3YjM5NzE5ZTE0OSIsInByaXZhdGVfa2V5IjoiMHgxZDI4MTBmYzliM2E2OTIwYjhkMjM5YjE2YzllZDk0ODQ4NzE1MjY3ODIwZjA5N2VkZWU4NWE3NTJlZjNkMzJiIiwiZXhwIjoyNTM0MDIyMTQ0MDB9.dZUSolvHV6Hb0byuAgWn8ErRHw4FWpTt0drQ6Dga4b8"       
 }`
      });
    const url = `http://localhost:5000/api/user/offers/${offerId}`;
    return this.http.delete(url,{headers});
  }


  apiUrl = 'http://localhost:5000/api/admin/filter_users';
  filterUsers(state: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    });
    // const url = `${this.apiUrl}/filter_users`;
    const url='http://localhost:5000/api/admin/filter_users';
    const requestBody = { state };
console.log("filtred users from service");
    return this.http.post(url, requestBody,{ headers });
  }


  filterOffers2(actorType: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2NGYwOWNjOGZlZDYxNjY0YjA4NWUyIiwicm9sZSI6InVzZXIiLCJwdWJsaWNfa2V5IjoiMHhiMzkzNDIyZjY0NWQxMTE5OWU1ZWM1YzRjZTk2YWIzYjA5NDhmMGQzMDM4NDJjMDU0YTUwZTEyYmU2ZjM0NWQwODdhNmZjMzY1Y2YyZmM4NDNhYWUyMmNiZjA4Njc4MzY1MjM5OTk5MmQ4ZTgxNDAxOTlkNWM3YjM5NzE5ZTE0OSIsInByaXZhdGVfa2V5IjoiMHgxZDI4MTBmYzliM2E2OTIwYjhkMjM5YjE2YzllZDk0ODQ4NzE1MjY3ODIwZjA5N2VkZWU4NWE3NTJlZjNkMzJiIiwiZXhwIjoyNTM0MDIyMTQ0MDB9.dZUSolvHV6Hb0byuAgWn8ErRHw4FWpTt0drQ6Dga4b8'}`
    });

    const url = 'http://localhost:5000/api/user/filter_offers';
    const body = { actorType };

    return this.http.post(url, body, { headers });
  }

  getUserByType(type: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.adminToken}`
    });
    const apiUrl = 'http://localhost:5000/api/admin/filter_users';
    const payload = { type: type };
    return this.http.post(apiUrl, payload, {headers });
  }

getUserByReference(ref:string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.adminToken}`
  });
  const apiUrl = 'http://localhost:5000/api/admin/filter_users';
  const payload = { actorRef: ref };
  return this.http.post(apiUrl, payload, {headers });
}



}

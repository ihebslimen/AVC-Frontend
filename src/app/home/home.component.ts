import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { User, agricole } from '../adminPages/list-of-users/list-of-users.component';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { AmdminServiceService } from '../services/admin-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

 
    ngOnInit(){
      this.searchUserById("6464f14ac8fed61664b085e6");   


//     document.cookie = "cookieName=cookieloula; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/";
//     const cookies = document.cookie.split(';');
// for (let i = 0; i < cookies.length; i++) {
//   const cookie = cookies[i].trim();
//   if (cookie.startsWith('cookieName=')) {
//     const cookieValue = cookie.substring('cookieName='.length);
//     console.log(cookieValue);
//     break;
//   }
// }


  }
  constructor(private adminService:AmdminServiceService, private http:HttpClient,private authenticationService:AuthenticationServiceService) { }
adminToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQyYmEyMzA0ZWE5OWIwMjIyMjdmMTBlIiwicm9sZSI6ImFkbWluIiwiZXhwIjoyNTM0MDIyMTQ0MDB9.baubGRFe5w8ukFMOnfNy2Tzfn7A6Xecf3VL5DVYxvmA'
private httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${this.adminToken}`
  })
}; 
filtredUsersByActorRef:User[];
  // filterUsersByActorRef(){
  //   const state = 'waiting';
  //   this.adminService.filterUsers(state).subscribe(
  //     (response) => {
  //       console.log("=======from filtred users-----------")
  //       // console.log('Filtered users:', response);
  //       console.log(response.data);
  //       // Handle the response data
  //     },
  //     (error) => {
  //       console.error('An error occurred', error);
  //       // Handle the error
  //     }
  //   );
  // } 
  user:User;
  searchUserById(userId: string) {
    const apiUrl = 'http://localhost:5000/api/admin/filter_users';
    const requestBody = { _id: userId };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.post(apiUrl, requestBody,this.httpOptions).subscribe(
      (response:any) => {
        this.user=response.data[0];
        console.log('User found:', response.data[0].name);
       
        // Handle the response data
      },
      (error) => {
        console.error('An error occurred', error);
        // Handle the error
      }
    );
  return this.user
  }
   
  
    
    slideIndex = 1;

  

     
    
  
    plusSlides(n: number) {
      this.showSlides(this.slideIndex += n);
    }
  
    currentSlide(n: number) {
      this.showSlides(this.slideIndex = n);
    }
  
    showSlides(n: number) {
      let i;
      const slides = document.getElementsByClassName("mySlides");
      const dots = document.getElementsByClassName("dot");
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].setAttribute("style", "display: none");
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex - 1].setAttribute("style", "display: block");
      dots[this.slideIndex - 1].className += " active";
    }


  








    
   


    showSectionHome: boolean = true;
    showSectionStarted: boolean =false;
    
    toggleSectionHome() {
      this.showSectionHome = true;
      this.showSectionStarted =false;
    }  
    showApropos() {
      this.showSectionHome = false;
      this.showSectionStarted = true;
    }




    // getAllOffers() {
    //   this.adminService.getAllOffers().subscribe(
    //     (response) => {
    //       console.log("----------getAllusers----------")
    //       console.log(response);
    //       console.log("type = " + typeof (response))
    //     console.log("--------------nos offres--------------------")
    //       console.log("iterable object===" + response.offers);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // }

    // usersHavingOffers:User[];
    // getUserByReference(reference:string){
    //   this.adminService.getUserByReference(reference).subscribe(
    //     (response) => {
    //       // Handle the response here
    //       console.log("users filtred by type")
    //       console.log(response);
    //       this.usersHavingOffers=response.data;
    //       // this.usersByType=response.data;
    //       // return response;
    //     },
    //     (error) => {
    //       // Handle errors here
    //       console.log("fama mochkel fil transformateurs")
    //       console.error(error);
    //     }
    //   );
    // }

   
 


}



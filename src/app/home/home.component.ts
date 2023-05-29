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

  constructor(private adminService:AmdminServiceService){} 
  
    
    slideIndex = 1;

  ngOnInit(){
    this.consulterHistoriqueUtilisateur();
  }

     
    
  
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

consulterHistoriqueUtilisateur(){
  let pubKey='0x421472051071af95d1425E290D814dFd55d81b14';
  this.adminService.consulterHistoriqueUtilisateur(pubKey).subscribe(
    (response)=>{
console.log(response.data[0].args["_prod_id"])
    },
    (error)=>{
console.log(error)
    }
  );
}


 

   
 


}



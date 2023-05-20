import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { agricole } from '../adminPages/list-of-users/list-of-users.component';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { AmdminServiceService } from '../services/amdmin-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

 

    ngOnInit(){
      
      const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(flipCard => {
    flipCard.addEventListener('click', function() {
      flipCard.classList.toggle('flipped');
    });
    this.showSlides(this.slideIndex);
    }); 

    this.getAllOffers()

  }
  constructor(private router: Router, private authenticationService:AuthenticationServiceService,private adminService:AmdminServiceService) { }

  isDragging = false;


   
  
    
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




    getAllOffers() {
      this.adminService.getAllOffers().subscribe(
        (response) => {
          console.log("----------getAllusers----------")
          console.log(response);
          console.log("type = " + typeof (response))
        console.log("--------------nos offres--------------------")
          console.log("iterable object===" + response.offers);
        },
        (error) => {
          console.log(error);
        }
      );
    }



}



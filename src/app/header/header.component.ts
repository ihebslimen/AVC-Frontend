import { Component,Input,Output ,EventEmitter, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { AuthenticationServiceService } from '../services/authentication-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
showLoginButton=true; loggedIn=false; buttonText=''; role:string;
  showScrollList:boolean; connected:boolean;   routeUrl: string;
@ViewChild('dropdownButton') dropdownButton!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
constructor(private router:Router,private renderer: Renderer2,private sectionService:AuthenticationServiceService,private route: ActivatedRoute, public authenticationService:AuthenticationServiceService) {
  router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.routeUrl = event.url;
    }
  });

  this.showScrollList=false;
  if(this.router.url==='/login'){
    this.showLoginButton=false;
  }
}


@ViewChild('nav') myElement!: ElementRef;

  ngAfterViewInit() {
    if(this.myElement){
    console.log(`height is${this.myElement.nativeElement.offsetHeight}`);}
    else{
      console.log("inexistant");
    }
  }
// const navHeight=document.querySelector('.navbar navbar-expand-lg')as HTMLElement?.getBoundingClientRect.Heig
 
 

isLoggedIn$ = this.authenticationService.isLoggedIn();
 ngOnInit() {
  this.route.url.subscribe(url => {
    // Check the current URL to see if the button should be shown
    if (url[0].path === 'home' || url.length===0) {
      this.showScrollList = true;
    } else {
      this.showScrollList = false;
    }
  });
  this.authenticationService.isLoggedIn().subscribe((loggedIn) => {
    this.loggedIn = loggedIn; this.connected=this.authenticationService.connected;
    this.buttonText = this.connected ? 'Logout' : 'Login';
    this.role=this.role;
    
  });
  console.log("connecté? =>"+this.connected);
}

logout(): void {
  this.authenticationService.logout();
  console.log("connexion state"+this.loggedIn)
}

 
 goToContact(){
  this.router.navigate(["/contact"]);
 }
 goToLogin(){
  this.router.navigate(["/contact"]);
 }
 hideButton(){
  document.getElementsByClassName("login-btn")[0].classList.add('DisplayNone');
 }


 
  
 toggleSectionHome() {
  this.sectionService.toggleSectionHome();
}

toggleSectionApropos() {
  this.sectionService.toggleSectionApropos();
}

  // toggleDropdown() {
  //   this.showDropdown = !this.showDropdown;
  //   if (this.showDropdown) {
  //     this.renderer.addClass(this.dropdownButton.nativeElement, 'active');
  //     this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  //   } else {
  //     this.renderer.removeClass(this.dropdownButton.nativeElement, 'active');
  //     this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  //   }
  // }
  


  sectionNumber!: number;
  @ViewChild('section1') section1!: ElementRef;
  @ViewChild('section2') section2!: ElementRef;
  @ViewChild('section3') section3!: ElementRef;
  @ViewChild('section4') section4!: ElementRef;
  // scrollToSection() {
  // let section: ElementRef<HTMLDivElement>;
  //   switch (this.sectionNumber) {
  //     case 1:
  //       section = this.section1;
  //       break;
  //     case 2:
  //       section = this.section2;
  //       break;
  //     case 3:
  //       section = this.section3;
  //       break;
  //     case 4:
  //       section = this.section4;
  //       break;
      
  //   }

  //     section!.nativeElement.scrollIntoView({ behavior: 'smooth' }); 
  // }
  selectedSection!: string;

  scrollToSection(){
    const selectedSectionElement = document.getElementById(this.selectedSection);
    selectedSectionElement!.scrollIntoView({ behavior: "smooth" });
  }


}


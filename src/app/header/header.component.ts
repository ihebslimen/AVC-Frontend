import { Component,Input,Output ,EventEmitter, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
showLoginButton=true;
  showScrollList:boolean;
@ViewChild('dropdownButton') dropdownButton!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
constructor(private router:Router,private renderer: Renderer2,private route: ActivatedRoute) {
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
 
 
 
 
 ngOnInit() {
  this.route.url.subscribe(url => {
    // Check the current URL to see if the button should be shown
    if (url[0].path === 'home' || url.length===0) {
      this.showScrollList = true;
    } else {
      this.showScrollList = false;
    }
  });
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


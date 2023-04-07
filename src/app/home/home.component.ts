import { Component,ViewChild,ElementRef,OnInit, ViewChildren,Renderer2, QueryList } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  startX !:number;
  startY !:number;
  mouseX !:number;
  mouseY !:number;
  // @ViewChildren('sectionElements') sectionElements: QueryList<ElementRef>;
  // sections: ElementRef[];private renderer: Renderer2;
  // getRandomColor(): string {
  //   const r = Math.floor(Math.random() * 256);
  //   const g = Math.floor(Math.random() * 256);
  //   const b = Math.floor(Math.random() * 256);
  //   return `rgb(${r}, ${g}, ${b})`;}
    ngOnInit(){
      const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(flipCard => {
    flipCard.addEventListener('click', function() {
      flipCard.classList.toggle('flipped');
    });
    }); 
    }
   
     



 

  



  
}
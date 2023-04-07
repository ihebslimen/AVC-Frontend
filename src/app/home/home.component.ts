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
    isDragging = false;
     
  //   onDragStart(event: DragEvent) {
  //     this.isDragging = true;
  //     const button = event.target as HTMLButtonElement;
  //     button.classList.add('dragging');
  //     this.startX = button.offsetLeft;
  // this.startY = button.offsetTop;
  // this.mouseX = event.clientX;
  // this.mouseY = event.clientY;
  // console.log(this.mouseX,this.mouseY,this.startX);
  //   }
    
  //   onDragEnd(event: DragEvent) {
  //     this.isDragging = false;
  //     const button = event.target as HTMLButtonElement;
  //     const deltaX = event.clientX - this.mouseX;
  // const deltaY = event.clientY - this.mouseY;
  
  //     button.style.left = `${this.startX + deltaX}px`;
  // button.style.top = `${this.startY + deltaY}px`;
  //     button.classList.remove('dragging');

  //   }
    
  // onMouseDown(event: MouseEvent) {
  //   const element = event.currentTarget as HTMLElement;
    
  //   this.startX = event.clientX - element.offsetLeft;
  //   this.startY = event.clientY - element.offsetTop;
  //   this.mouseX = event.clientX;
  //   this.mouseY = event.clientY;

  //   document.addEventListener('mousemove', this.onMouseMove);
  //   document.addEventListener('mouseup', this.onMouseUp);
  // }

  // onMouseMove = (event: MouseEvent) => {
  //   const deltaX = event.clientX - this.mouseX;
  //   const deltaY = event.clientY - this.mouseY;

  //   const element = event.currentTarget as HTMLElement;
  //   element.style.left = `${element.offsetLeft + deltaX}px`;
  //   element.style.top = `${element.offsetTop + deltaY}px`;

  //   this.mouseX = event.clientX;
  //   this.mouseY = event.clientY;
  // }

  // onMouseUp = () => {
  //   document.removeEventListener('mousemove', this.onMouseMove);
  //   document.removeEventListener('mouseup', this.onMouseUp);
  // }


 

  



  
}
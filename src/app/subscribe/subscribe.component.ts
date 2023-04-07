import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {
  isMenuOpened:boolean=false;
  toggleMenu(){
    this.isMenuOpened=!this.isMenuOpened;
  }
  clickedOutside():void{
    this.isMenuOpened=false;
  }
  // document.getElementById("subscribeForm").addEventListener("submit", function(event) {
  //   event.preventDefault(); // prevent the form from submitting

  //   const email = document.getElementById("email").value;
  //   if (!email) {
  //     alert("Please enter a valid email address");
  //   } else {
  //     alert("Subscription successful!");
  //   }
  // }
  // pass1=document.getElementById('password')?.value;
  password=''; password1='';
  isCollapsed = true;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Please enter a valid email address.');
    } else {
      alert('Subscription successful!');
    }
  }
}

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthenticationServiceService } from '../services/authentication-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isCollapsed = true; regex = /^\d+$/; 
  showAlert !:boolean; showerrorMessage=false; showSuccessMessage=false;
  
constructor(private router:Router,private authenticationService:AuthenticationServiceService){}
goToSubscribe(): void {
  this.router.navigate(['subscribe']);
}
cin !: string; password:string=''; passwordError=false;
  loginIsValid !: boolean; loginIsSubmitted:boolean=false;
  errorMessage !:string; 
onSubmitLogin(){
  console.log("submission ......");
  this.loginIsSubmitted=true; 
   // regular expression to match only numbers
  this.loginIsValid = this.regex.test(this.cin);
  if(this.loginIsValid){
    this.showSuccessMessage = true;
console.log("login valid")
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }
  else{
    console.log("login is not valid")
    this.showerrorMessage=true;
    setTimeout(() => {
      this.loginIsValid=true;
      this.showerrorMessage = false;
    }, 3000);
  }
  //todo ki kenet submit bil cin wel password

// if(this.password.length<6 || this.password.length>6){
//   this.passwordError=true;
//   console.log(this.passwordError,"ekteb kol chay",this.password,this.password.length);
//   setTimeout(() => {
//     this.passwordError = false;
//   }, 3000); 
// }
//todo
// if(this.password==="adminPass"){
//   this.router.navigate(['listOfUsers'],{ queryParams: { userType: 'admin' } });
// }
//todo ki kenet submit bil cin wel password
// this.authenticationService.login(this.cin,this.password);
//todo


// if(this.password==="userPass"){
//   this.router.navigate(['profile'],{ queryParams: { userType: 'user' } });
// }

}
registerIsValid !: boolean; registerIsSubmitted:boolean=false;

onSubmitRegister(){
  if(this.veriferOuEnvoyer=="verifier"){
this.registerIsSubmitted=true;
}

}
cinRegister !:number; cinRegisterIsValid !:boolean; cinSubmitted:boolean=false;
onSubmitCin(event:Event){
  this.cinSubmitted=true;
this.cinRegisterIsValid=(this.cinRegister >= 1000000 && this.cinRegister <= 99999999) ? true : false;
if(this.cinRegisterIsValid){
  console.log(this.cinRegisterIsValid);
  console.log(this.cinRegister);
  console.log("sahit");
  this.showSuccessMessage=true;
  setTimeout(() => {
    this.showSuccessMessage = false;
  }, 3000);
}
else{console.log(this.cinRegisterIsValid);
  event.preventDefault();
  console.log(this.cinRegister);
  console.log("4alt");
  this.showerrorMessage=true;
  setTimeout(() => {
    this.showerrorMessage = false;
  }, 3000);
}
}
 codeRegisterIsValid !:boolean; codeSubmitted:boolean=false;
  input1!: string;
  input2!: string;
  input3!: string;
  input4!: string;
  input5!: string;
  input6!: string;
  @ViewChild('formCode') formCode!: NgForm;
  
onSubmitCode(){
  this.codeSubmitted=true;
  if(this.formCode.valid){
  this.codeRegisterIsValid=true;
  console.log(this.codeSubmitted);
  setTimeout(this.moveLoginForm,2000);
  this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }
  else{
    this.codeRegisterIsValid=false;
    console.log(this.codeSubmitted);
this.showerrorMessage=true;
    setTimeout(() => {
      this.showerrorMessage = false;
    }, 3000);
  }
}


onSubmitPassword(){
  console.log("password submitted")
  console.log(this.password);
  this.authenticationService.login(this.password);
}


isHidden = false; isWaiting=false;
isActive=false;
active(){ 
  this.isActive= !this.isActive;
  console.log(this.isActive);
}
front=true;
moveLoginForm(): void {
  if(this.front){
  const loginForm = document.querySelector('.login-form') as HTMLElement;
  loginForm.style.transform = 'translateX(-550px)';
  const slideWelcome= document.querySelector('.slideWelcome') as HTMLElement;
  slideWelcome.style.transform = 'translateX(-520px)';
  slideWelcome.style.transitionDelay='.1s';
}
  else{
    const slideWelcome= document.querySelector('.slideWelcome') as HTMLElement;
  slideWelcome.style.transform = 'translateX(0)';
  slideWelcome.style.transitionTimingFunction='ease-in-out';
  const loginForm = document.querySelector('.login-form') as HTMLElement;
  loginForm.style.transform = 'translateX(0)';
  loginForm.style.transitionDelay='.1s';}
  this.front=!this.front;
}
  hide() {
    this.isHidden = true;
  }
  

  
  bouttonVerifierIsClicked=false;
  veriferOuEnvoyer="envoyer";
  bouttonVerifierClicked(){
    this.bouttonVerifierIsClicked=!false;
    this.veriferOuEnvoyer="verifier";
  }

}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { AmdminServiceService } from '../services/admin-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isCollapsed = true; regex = /^\d+$/; 
  showAlert !:boolean; showerrorMessage=false; showSuccessMessage=false;
  
constructor(private router:Router,private authenticationService:AuthenticationServiceService,private adminService:AmdminServiceService){}
ngOnInit(){
  const pageHeight = document.documentElement.clientHeight;
// console.log(`The height of the page is ${pageHeight}px`);
// this.verifierUserType(this.cin);
console.log("users===="+this.users)
this.getUsers2();
this.getUser("645e7a488b96b66d55bde08e");
console.log("users===="+this.users)

}
goToSubscribe(): void {
  this.router.navigate(['subscribe']);
}
password:string=''; passwordError=false;
  loginIsValid !: boolean; loginIsSubmitted:boolean=false;
  errorMessage !:string; 
  cin : number; 
onSubmitLogin(){
  this.loginIsSubmitted=true; 
   // regular expression to match only numbers
  // this.loginIsValid = this.regex.test(this.cin) ;
  this.loginIsValid=this.cin>= 1000000 && this.cin <= 99999999
  if(this.loginIsValid){
    this.showSuccessMessage = true;
// console.log("login valid")
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 1000);
  }
  else{
    console.log("login is not valid")
    this.showerrorMessage=true;
    setTimeout(() => {
      // this.loginIsValid=true;
      this.showerrorMessage = false;
    }, 1000);
  }

}
registerIsValid !: boolean; registerIsSubmitted:boolean=false;

onSubmitRegister(){
  if(this.veriferOuEnvoyer=="verifier"){
this.registerIsSubmitted=true;
}

}
cinRegister !:number; cinRegisterIsValid !:boolean; cinSubmitted:boolean=false;
nomSignup!:string; emailSignup!:string; phoneSignup!:Text; roleSignup!:string;
stateSingup!:string; typeSignup!:string; localisationSignup!:string;
onSubmitCin(event:Event){
  this.cinSubmitted=true;
this.cinRegisterIsValid=(this.cinRegister >= 1000000 && this.cinRegister <= 99999999) ? true : false;
if(this.cinRegisterIsValid){
  console.log(this.cinRegisterIsValid);
  console.log(this.cinRegister);
  console.log(this.nomSignup);
  console.log(this.emailSignup);
  console.log(this.phoneSignup);
  console.log(this.roleSignup);
  console.log(this.stateSingup);
  console.log(this.typeSignup);
  console.log(this.localisationSignup);
    this.showSuccessMessage=true;
  setTimeout(() => {
    this.showSuccessMessage = false;
  }, 1000);
}
else{console.log(this.cinRegisterIsValid);
  event.preventDefault();
  console.log(this.cinRegister);
  console.log("4alt");
  this.showerrorMessage=true;
  setTimeout(() => {
    this.showerrorMessage = false;
  }, 1000);
}
}
 codeRegisterIsValid !:boolean; codeSubmitted:boolean=false;
 
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
    }, 1000);
  }
  else{
    this.codeRegisterIsValid=false;
    console.log(this.codeSubmitted);
this.showerrorMessage=true;
    setTimeout(() => {
      this.showerrorMessage = false;
    }, 1000);
  }
}


onSubmitPassword(){
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


  backToCinFunction(){
    this.loginIsValid=false;
    this.cinRegisterIsValid=false;
  }


  @ViewChild('input1', { static: true }) input1: ElementRef;
  @ViewChild('input2', { static: true }) input2: ElementRef;
  @ViewChild('input3', { static: true }) input3: ElementRef;
  @ViewChild('input4', { static: true }) input4: ElementRef;
  @ViewChild('input5', { static: true }) input5: ElementRef;
  @ViewChild('input6', { static: true }) input6: ElementRef;

  input1Value: string;
  input2Value: string;
  input3Value: string;
  input4Value: string;
  input5Value: string;
  input6Value: string;

  ngAfterViewInit() {
    this.input1.nativeElement.focus();
    this.input1.nativeElement.addEventListener('keyup', () => {
      if (this.input1Value.length === 1) {
        this.input2.nativeElement.focus();
      }
    });
    this.input2.nativeElement.addEventListener('keyup', () => {
      if (this.input2Value.length === 1) {
        this.input3.nativeElement.focus();
      }
    });
    this.input3.nativeElement.addEventListener('keyup', () => {
      if (this.input3Value.length === 1) {
        this.input4.nativeElement.focus();
      }
    });
    this.input4.nativeElement.addEventListener('keyup', () => {
      if (this.input4Value.length === 1) {
        this.input5.nativeElement.focus();
      }
    });
    this.input5.nativeElement.addEventListener('keyup', () => {
      if (this.input5Value.length === 1) {
        this.input6.nativeElement.focus();
      }
    });
  }

 


  ajouterUtilisateur() {
    const requestBody = {
      "cin": this.cinRegister.toString(),
      "name":this.nomSignup,
      "email": this.emailSignup,
      "phone":this.phoneSignup,
      "role":this.roleSignup,
      "state":"waiting",
      "type":"agricole",
      "actorInfoJson":{"localisation": "bizerte"}
      // Add more parameters as needed
    };
    console.log(requestBody);
    this.adminService.ajouterUtilisateur(requestBody).subscribe(
      (response) => {
        console.log('User added');
      },
      (error) => {
        console.error('An error occurred', error);
      }
    );
  }
  
  
userType:string;
agriculteurs:User[]; transformateurs:User[]; exportateurs:User[];
  verifierUserType(cin:number){
    // let userType="transformateur";
    this.adminService.getUserByType("agriculteur").subscribe(
      (response) => {
        // Handle the response here
        console.log("users filtred by type")
        // console.log(response);
        this.agriculteurs=response.data;
        console.log("agriculteurs:::");
        console.log(this.agriculteurs)
        // this.usersByType=response.data;
        // return response;
        let agriculteursCins=this.agriculteurs.map(exp=>exp.cin);
        console.log(agriculteursCins)
        if (agriculteursCins.some(c => c === cin.toString())) {
          console.log("mawjoud fil faleha");
          this.userType = "agriculteur";
          this.authenticationService.setUserType(this.userType);
        }
      },
      (error) => {
        // Handle errors here
        console.log("fama mochkel fil transformateurs")
        console.error(error);
      }
    );

    this.adminService.getUserByType("transformateur").subscribe(
      (response) => {
        // Handle the response here
        console.log("users filtred by type")
        // console.log(response);
        this.transformateurs=response.data;
        console.log("transformateurs:::");
        console.log(this.transformateurs)
        // this.usersByType=response.data;
        // return response;
        let transformateursCins=this.transformateurs.map(exp=>exp.cin);
        console.log(transformateursCins)
        if (transformateursCins.some(c => c === cin.toString())) {
          console.log("mawjoud fil transps");
          this.userType = "transportateur";
          this.authenticationService.setUserType(this.userType);
        }
      },
      (error) => {
        // Handle errors here
        console.log("fama mochkel fil transformateurs")
        console.error(error);
      }
    );
    this.adminService.getUserByType("exportateur").subscribe(
      (response) => {
        // Handle the response here
        console.log("users filtred by type")
        // console.log(response);
        this.exportateurs=response.data;
        console.log("exportateurs:::");
        let exportateursCins=this.exportateurs.map(exp=>exp.cin);
        console.log(exportateursCins);
        console.log(this.exportateurs)
        // this.usersByType=response.data;
        // return response;
        if (exportateursCins.some(c => c === cin.toString())) {
          console.log("mawjoud fil exportateurs");
          this.userType = "exportateur";
          this.authenticationService.setUserType(this.userType);
        }
      },
      (error) => {
        // Handle errors here
        console.log("fama mochkel fil transformateurs")
        console.error(error);
      }


     
    );
console.log("type de user------------------------//>>"+this.userType);
console.log(this.cin)
    }


    getUser(id:any){
  this.authenticationService.getUserById(id).subscribe(
    (Response)=>{
console.log(Response);
    },
    (error)=>{
console.log(error);
    }
  )
    }
    users:User[]; user:any;
    public getUsers2(){
      this.adminService.temchiBidhnallah3()
      .subscribe(
        (response) => {
          let text = JSON.stringify(response);
          let users = JSON.parse(text); // convert string response to JSON object
          console.log("this is from getUsers2")
         console.log(users.data);
  this.users=users.data;
  const id="645e7a488b96b66d55bde08e";
  this.user=this.users.filter(user=>user._id==id)[0]
        console.log("user li tlawej 3lih"+this.user.name);
          return users;
        },
        (error) => {
          console.error(error);
        }
      );}



      
  

}





export interface User {
  _id: string;
  cin: string;
  email: string;
  name: string;
  phone: string;
  role: "admin" | "user";
  type:"agriculteur" | "transformateur" | "exportateur";
  // state:"approved" | "waiting"
  public_key: string;
  // role: string;
  // type: string;
}
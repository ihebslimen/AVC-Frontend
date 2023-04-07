import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AmdminServiceService } from 'src/app/services/amdmin-service.service';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.css']
})
export class ListOfUsersComponent implements OnInit{
http!:HttpClient; start=0; selectedLength = 5;
lengths = [5, 10, 15, 20];
currentPage: number = 1;
numberOfPages!:number;
public section: string = '';

userType: string | null;
  
constructor(private adminService:AmdminServiceService,private route: ActivatedRoute){
  //diviser slide of functionalities entre les taches de l'administrateur et les fonctionnalités possible pour un utilisateur
  this.userType=this.route.snapshot.queryParamMap.get('userType');
  console.log("lmodel dhaher"+this.showModalFlag);
}
// users:User[]=[];
public users:User[]=[]; public originalTable!:User[];
ngOnInit(){

this.getUsers();
this.originalTable=[...this.users];
}
getUsers(){
  this.adminService.getUsers().subscribe(result=>{
this.users=result; console.log(this.users);
  });
}
filterValue:string='';
// filterName:string=""; filterUsername:string=""; filterEmail:string=""; filteredUsers = this.users;
sortValue: string = '';
// sortedUsers=this.users.slice();
sortTable() {
  if (this.sortValue === 'name') {
    this.users= this.users.slice().sort(
      (a, b) => a.name.localeCompare(b.name)
    );
    }
}
sortTableArrows(param:string,order:string) {
  if(order=="asc"){
  if (param === 'name') {
    this.users= this.users.slice().sort(
      (a, b) => a.name.localeCompare(b.name)
    );
    }
    if (param === 'username') {
      this.users= this.users.slice().sort(
        (a, b) => a.username.localeCompare(b.name)
      );
      }
      if (param === 'email') {
        this.users= this.users.slice().sort(
          (a, b) => a.email.localeCompare(b.name)
        );
        }
  }
  if(order=="des"){
    if (param === 'name') {
      this.users= this.users.slice().sort(
        (a, b) => a.name.localeCompare(b.name)
      ).reverse();
      }
      if (param === 'username') {
        this.users= this.users.slice().sort(
          (a, b) => a.username.localeCompare(b.name)
        ).reverse();
        }
        if (param === 'email') {
          this.users= this.users.slice().sort(
            (a, b) => a.email.localeCompare(b.name)
          ).reverse();
          }
  }
}
filtredUsers:User[];
applyFilter(){
if(this.filterValue.length>0){
  
  this.filtredUsers = this.users.filter(user =>
    user.name.toLowerCase().includes(this.filterValue.toLowerCase()) ||
    user.username.toLowerCase().includes(this.filterValue.toLowerCase()) ||
    user.email.toLowerCase().includes(this.filterValue.toLowerCase())
  );
}
}

resetTable() {
  console.log(this.originalTable);
  // this.users = this.getUsers();
  // this.filterName = '';
  // this.filterUsername = '';
  // this.filterEmail = '';
  this.filterValue = '';
  this.sortValue='';
}
updateCurrentPage(direction:string) {
  if(direction=="next"){
  this.currentPage +=1;}
  if(direction=="back"){
    this.currentPage -=1;}
}

getPaginatedData() {
  const startIndex = (this.currentPage - 1) * this.selectedLength;
  this.numberOfPages=this.users.length/this.selectedLength;
  console.log(this.numberOfPages)
  return this.users.slice(startIndex, Number(startIndex) + Number(this.selectedLength));
}

showSectionInscription: boolean = false;
showSectionGestionUtilisateur: boolean = true;
  toggleSection(sectionId: string,event:MouseEvent) {
    event.preventDefault();
    if (sectionId === 'utilisateur') {
      this.showSectionInscription = false;
      this.showSectionGestionUtilisateur = true;
    } 
    if (sectionId === 'Inscription') {
      this.showSectionGestionUtilisateur = false;
      this.showSectionInscription = true;

    } 
    // console.log(this.showSection);
  }
//todo fazet ki tenzel 3al bouton yo5rjo informations
  selectedUser: any;
  showModalFlag = false; operation:string;

  showModal(user: any,operation:string) {
    this.selectedUser = user;
    this.showModalFlag = true;
    if(operation==='edit'){
      this.operation="edit";
    }
    if(operation==='delete'){
      this.operation="delete";
    }

    
  }

  hideModal() {
    this.selectedUser = null;
    this.showModalFlag = false;
  }

//todo fonctions modifier et supprimer


public onUpdateUser(user: User): void {
  this.adminService.updateUser(user).subscribe(
    (response: User) => {
      console.log(response);
      this.getUsers();
    },
    // (error: HttpErrorResponse) => {
    //   alert(error.message);
    // }
  );
}

public onDeleteUser(userId: number): void {
  this.adminService.deleteUser(userId).subscribe(
    (response: void) => {
      console.log(response);
      this.getUsers();
    },
    // (error: HttpErrorResponse) => {
    //   alert(error.message);
    // }
  );
}


//toDo

// moveLeft(){
//   this.start=this.start-5;
//   console.log(this.start)
// } 
// moveRight(){
// this.start=this.start+this.selectedLength;

// console.log(this.start)
// }

}
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}


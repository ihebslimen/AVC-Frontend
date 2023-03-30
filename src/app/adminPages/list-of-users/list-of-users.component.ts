import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AmdminServiceService } from 'src/app/services/amdmin-service.service';

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


constructor(private adminService:AmdminServiceService){}
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
filterName:string=""; filterUsername:string=""; filterEmail:string=""; filteredUsers = this.users;
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
applyFilter(){
    // console.log(this.filterName);
    if(this.filterName.length>0){
    this.users = this.users.filter(user =>
      user.name.toLowerCase().includes(this.filterName.toLowerCase()) 
    );
}
if(this.filterUsername.length>0){
  this.users = this.users.filter(user =>
    user.username.toLowerCase().includes(this.filterUsername.toLowerCase()) 
  );
}
if(this.filterEmail.length>0){
  this.users = this.users.filter(user =>
    user.email.toLowerCase().includes(this.filterEmail.toLowerCase()) 
  );
}
if(this.filterValue.length>0){

  this.users = this.users.filter(user =>
    user.name.toLowerCase().includes(this.filterValue.toLowerCase()) ||
    user.username.toLowerCase().includes(this.filterValue.toLowerCase()) ||
    user.email.toLowerCase().includes(this.filterValue.toLowerCase())
  );
}
}



resetTable() {
  console.log(this.originalTable);
  // this.users = this.getUsers();
  this.filterName = '';
  this.filterUsername = '';
  this.filterEmail = '';
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
  return this.users.slice(startIndex, startIndex + this.selectedLength);
}




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


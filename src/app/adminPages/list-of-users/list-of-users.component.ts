import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AmdminServiceService } from 'src/app/services/amdmin-service.service';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';


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
userRole:string | null;
  
constructor(private adminService:AmdminServiceService,private route: ActivatedRoute, private authenticationService:AuthenticationServiceService){
  //diviser slide of functionalities entre les taches de l'administrateur et les fonctionnalités possible pour un utilisateur
  this.userType=this.route.snapshot.queryParamMap.get('userType');
  this.userRole=this.route.snapshot.queryParamMap.get('userRole');
  console.log("lmodel dhaher"+this.showModalFlag);
}

public users:User[]=[];

public originalTable!:User[];
ngOnInit(){

this.getUsers();
this.originalTable=[...this.users];
this.getUsers2();
}
getUsers(){
  this.authenticationService.authorisation().subscribe(result=>{
// this.users=result;
// let ness=this.adminService.getUsersTemchi();
//  console.log("les utilisateurs li raj3o"+ness+ " type mte3o "+typeof(ness));
  });

  // console.log("haw inchallah temchi"+this.authenticationService.temchiBidhnallah());
}

getUsers2() {
  this.authenticationService.authorisation().subscribe(
    (users) => {
      this.users = users;
      // console.log(users)
      // console.log("from temchiBidhnallah2()"+ users)
      // console.log(users[0].role)
    },
    (error) => {
      console.error(error);
    }
  );
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
        (a, b) => a.name.localeCompare(b.name)
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
          (a, b) => a.name.localeCompare(b.name)
        ).reverse();
        }
        if (param === 'email') {
          this.users= this.users.slice().sort(
            (a, b) => a.email.localeCompare(b.name)
          ).reverse();
          }
  }
}
  filtredUsers: User[] = [];
applyFilter(){
if(this.filterValue.length>0){
  
  this.filtredUsers = this.users.filter(user =>
    user.name.toLowerCase().includes(this.filterValue.toLowerCase()) ||
    // user.username.toLowerCase().includes(this.filterValue.toLowerCase()) ||
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

/** Inscription */
showSectionInscription: boolean = false;
/**Gestion Utilisateur */
showSectionGestionUtilisateur: boolean = true;
/**Gestion Stock */
showSectionFarmerStock:boolean =false;
showSectionTransformateurStock:boolean =false;
showSectionExportateurStock:boolean =false;
/** Vioalation*/
showReclamationSection:boolean=false;
/** historique */
showhistoriqueAgricolteur:boolean=true;
showhistoriqueTransformateur:boolean=true;
showhistoriqueExportateur:boolean=true;
/** Consuleter */
showTransformateurs:boolean =false;
showExportateurs:boolean =false;
/** Offre */
showOffreAgricoleur:boolean=false;
showOffreTransformateur:boolean=false;

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
    if (sectionId === 'reclamation') {

      /* show utilisateur */
      this.showTransformateurs=false;
      this.showExportateurs=false;
      /* stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock=false;
      this.showSectionExportateurStock= false ;
      /* Reclamation */
      this.showReclamationSection=true;
      /* Historique */
      this.showhistoriqueAgricolteur =false;
      this.showhistoriqueTransformateur=false;
      this.showhistoriqueExportateur= false ;
      /* Appelle d'offre */
      this.showOffreAgricoleur=false;
      this.showOffreTransformateur=false;
     
    } 
    if(sectionId === 'historique'){
      /* Show utilisateur */
      this.showTransformateurs=false;
      this.showExportateurs=false;
      /* Stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock=false;
      this.showSectionExportateurStock= false ;
      /* Reclamation */
      this.showReclamationSection=false;
      /* Appelle d'offre */
      this.showOffreAgricoleur=false;
      this.showOffreTransformateur=false;
              if(this.userRole==='agriculteur')
              {
                this.showhistoriqueAgricolteur =true;
                this.showhistoriqueTransformateur=false;
                this.showhistoriqueExportateur= false ;
              }
              if(this.userRole==='transformateur')
              {
                this.showhistoriqueAgricolteur =false ;
                this.showhistoriqueTransformateur=true ;
                this.showhistoriqueExportateur=false ;
              }
              if(this.userRole==='exportateur')
              {
                this.showhistoriqueAgricolteur  =false ;
                this.showhistoriqueTransformateur=false ;
                this.showhistoriqueExportateur=true;
              }
    }
    if(sectionId === 'transformateurs'){
   /* Show utilisateur */
   this.showTransformateurs=true;
   this.showExportateurs=false;
   /* Stock */
   this.showSectionFarmerStock = false;
   this.showSectionTransformateurStock=false;
   this.showSectionExportateurStock= false ;
   /* Reclamation */
   this.showReclamationSection=false;
   /* Historique */
   this.showhistoriqueAgricolteur =false;
   this.showhistoriqueTransformateur=false;
   this.showhistoriqueExportateur= false ;
   /* Appelle d'offre */
   this.showOffreAgricoleur=false;
   this.showOffreTransformateur=false;
    }
    if(sectionId === 'exportateurs'){
   /* show utilisateur */
   this.showTransformateurs=false;
   this.showExportateurs=true;
   /* stock */
   this.showSectionFarmerStock = false;
   this.showSectionTransformateurStock=false;
   this.showSectionExportateurStock= false ;
   /* Reclamation */
   this.showReclamationSection=false;
   /* Historique */
   this.showhistoriqueAgricolteur =false;
   this.showhistoriqueTransformateur=false;
   this.showhistoriqueExportateur= false ;
   /* Appelle d'offre */
   this.showOffreAgricoleur=false;
   this.showOffreTransformateur=false;
    }
    if(sectionId === 'offretransformateur'){
        /* show utilisateur */
        this.showTransformateurs=false;
        this.showExportateurs=false;
        /* stock */
        this.showSectionFarmerStock = false;
        this.showSectionTransformateurStock=false;
        this.showSectionExportateurStock= false ;
        /* Reclamation */
        this.showReclamationSection=false;
        /* Historique */
        this.showhistoriqueAgricolteur =false;
        this.showhistoriqueTransformateur=false;
        this.showhistoriqueExportateur= false ;
        /* Appelle d'offre */
        this.showOffreAgricoleur=false;
        this.showOffreTransformateur=true;
    }
    if(sectionId === 'offreAgricolteur'){
      /* show utilisateur */
      this.showTransformateurs=false;
      this.showExportateurs=false;
      /* stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock=false;
      this.showSectionExportateurStock= false ;
      /* Reclamation */
      this.showReclamationSection=false;
      /* Historique */
      this.showhistoriqueAgricolteur =false;
      this.showhistoriqueTransformateur=false;
      this.showhistoriqueExportateur= false ;
      /* Appelle d'offre */
      this.showOffreAgricoleur=true;
      this.showOffreTransformateur=false;
  }
    if(sectionId === 'Stock'){
        /* show utilisateur */
        this.showTransformateurs=false;
        this.showExportateurs=false;
        /* Reclamation */
        this.showReclamationSection=false;
        /* Historique */
        this.showhistoriqueAgricolteur =false;
        this.showhistoriqueTransformateur=false;
        this.showhistoriqueExportateur= false ;
        /* Appelle d'offre */
        this.showOffreAgricoleur=false;
        this.showOffreTransformateur=true;
                    if(this.userRole==='agriculteur')
                    {
                      this.showSectionFarmerStock =true;
                      this.showSectionTransformateurStock=false;
                      this.showSectionExportateurStock= false ;
                    }
                    if(this.userRole==='transformateur')
                    {
                      this.showSectionFarmerStock =false;
                      this.showSectionTransformateurStock=true;
                      this.showSectionExportateurStock= false ;
                    }
                    if(this.userRole==='exportateur')
                    {
                      this.showSectionFarmerStock =false;
                      this.showSectionTransformateurStock=false;
                      this.showSectionExportateurStock= true ;
                    }

    }


    // console.log(this.showSection);
  }
//todo fazet ki tenzel 3al bouton yo5rjo informations
  selectedUser: any;
  showModalFlag = false; operation:string | undefined;
showAboutUser=false;
  showModal(user: any,operation:string) {
    this.selectedUser = user;
    this.showModalFlag = true;
    if(operation==='edit'){
      this.operation="edit";
    }
    if(operation==='delete'){
      this.operation="delete";
    }   
    if(operation==='stats'){
      this.operation="stats";
    }   
    if(operation==='moreDetails'){
      this.operation="moreDetails";
    } 
    console.log("operation=="+this.operation);
  }

  hideModal() {
    if(this.selectedUser){
    this.selectedUser = null;}
    this.showModalFlag = false;
  }

  
    
//todo fonctions modifier et supprimer


public onUpdateUser(user: User,id_user:number): void {
  this.adminService.updateUser(user,id_user).subscribe(
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


quantity:number; quality:string; price:number;

  stock = [
    { quality: 'High', quantity: 1000, price: 5.00 },
    { quality: 'Medium', quantity: 500, price: 3.00 },
    { quality: 'Low', quantity: 200, price: 1.50 }
  ];


    updateStock() {
      if(this.quality !== null){
      const index = this.stock.findIndex(item => item.quality === this.quality);
      if (index !== -1) {
        const item = this.stock[index];
        if (this.quantity) {
          item.quantity += this.quantity;
        }
        if (this.price) {
          item.price = this.price;
        }
        console.log("item"+item.quality+"is now "+item.quantity+" abd price is ===="+item.price)

      }
     
    }
  

    }
    role:string;
    affecterRole(role:string){
      this.role=role;
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
  _id: string;
  cin: string;
  email: string;
  name: string;
  phone: string;
  role: "admin" | "user";
}
export interface agricole {
  _id: string;
  localisation: string;
}


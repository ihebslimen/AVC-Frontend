import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AmdminServiceService } from 'src/app/services/amdmin-service.service';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { NgForm } from '@angular/forms';


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


let Farmers=this.adminService.getAgricoles();
console.log("farmers ==============="+Farmers);
console.log(this.getAgricoles());
this.getAllOffers()
}
getUsers(){
  this.adminService.getUsers().subscribe(result=>{
// this.users=result;
// let ness=this.adminService.getUsersTemchi();
//  console.log("les utilisateurs li raj3o"+ness+ " type mte3o "+typeof(ness));
  });

  console.log("haw inchallah temchi"+this.adminService.temchiBidhnallah());
}




getUsers2() {
  this.adminService.temchiBidhnallah2().subscribe(
    (users) => {
      this.users = users;
      console.log("from temchiBidhnallah2()"+ users)
      console.log(users[0].role)
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
  selectedUser: any;    selectedOffer:any;
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
updateStockMode:boolean=false;
  showUpdateStock(){
this.showModalFlag=true;
this.updateStockMode=true;
  }

  hideModal() {
    if(this.selectedUser){
    this.selectedUser = null;}
    this.showModalFlag = false;
  }

  
    
//todo fonctions modifier et supprimer


// public onUpdateUser(user: User,id_user:number): void {
//   this.adminService.updateUser(user,id_user).subscribe(
//     (response: User) => {
//       console.log(response);
//       this.getUsers();
//     },
    // (error: HttpErrorResponse) => {
    //   alert(error.message);
    // }
//   );
// }

// public onDeleteUser(userId: number): void {
//   this.adminService.deleteUser(userId).subscribe(
//     (response: void) => {
//       console.log(response);
//       this.getUsers();
//     },

//   );
// }




quantity:number; quality:string; price:number;

  stock = [
    { quality: 'High', quantity: 1000, price: 5.00 },
    { quality: 'Medium', quantity: 500, price: 3.00 },
    { quality: 'Low', quantity: 200, price: 1.50 }
  ];

  @ViewChild('UpdateStockForm', { static: false }) UpdateStockForm: NgForm;
    updateStock(offerId:string) {
    const requestBody={
    updatedQuantity:this.UpdateStockForm.value['product-quantity'],
    Quality: this.UpdateStockForm.value['product-quality'],
    Price: this.UpdateStockForm.value['product-price'],
    Unit: this.UpdateStockForm.value['product-unit'],
    updatedState:this.UpdateStockForm.value['state'],
    Actor_Type: this.UpdateStockForm.value['actor-type'],
    updatedRef:this.UpdateStockForm.value['actor-ref'],
    }

    this.adminService.updateOffer(offerId, requestBody)
    .subscribe(
      response => {
      
        console.log('Update request successful', response);
        // Perform further actions if needed
      },
      error => {
        console.error('Update request error', error);
        // Handle error scenarios if needed
      }
    );   


    }
    role:string;
    affecterRole(role:string){
      this.role=role;
    }
  
    @ViewChild('UpdatestockForm', { static: false }) UpdatestockForm: NgForm;
    showUpdateStockValues(){
      console.log('Quantity:', this.UpdatestockForm.value['product-quantity']);
      console.log('Quality:', this.UpdatestockForm.value['product-quality']);
      console.log('Price:', this.UpdatestockForm.value['product-price']);
      console.log('Unit:', this.UpdatestockForm.value['product-unit']);
      console.log('Actor Type:', this.UpdatestockForm.value['actor-type']);
    }






ajouterUtilisateur(){
this.adminService.ajouterUtilisateur();
}

Farmers=this.adminService.getAllFarmers();

public agricols: agricole[] = [];

getAgricoles(): void {
  this.adminService.getAgricoles().subscribe(
    (response) => {
      console.log("hay mchet getAgricoles");
      console.log(response);
      this.agricols = response.agricoles;
    },
    (error) => {
      console.error(error);
    }
  );
}


deleteAgricole(id:string){
  this.adminService.deleteAgricole(id);
}
deleteUser(id:string){
  console.log("id = "+id);
this.adminService.deleteUser(id);
}


deleteUser2(id: string): void {
  const url = `http://localhost:5000/api/admin/users/${id}`;
  
  this.adminService.deleteUser2(id).subscribe(
    (response) => {
      console.log('User deleted successfully');
    },
    (error) => {
      console.error(error);
    }
  );
}

updatedName:string;  updatedCin:string; updatedEmail:string;
updatedPhone:string; updatedRole:string; updatedType:string; updatedState:string;
updateUserValues(){
  console.log("this is update function");
  console.log(this.updatedName);
  console.log(this.updatedCin);
  console.log(this.updatedPhone);
  console.log(this.updatedRole);
  console.log(this.updatedEmail);
  console.log(this.updatedType);
  console.log(this. updatedState)
}


updateUser(userId:string) {
 
  const payload = {
    cin: this.updatedCin,
    name: this.updatedName,
    email: this.updatedEmail,
    phone: this.updatedPhone,
    role: this.updatedRole,
    type: this.updatedType,
    state:this.updatedState
  };

  this.adminService.updateUser(userId, payload)
    .subscribe(
      response => {
      
        console.log('Update request successful', response);
        // Perform further actions if needed
      },
      error => {
        console.error('Update request error', error);
        // Handle error scenarios if needed
      }
    );
}

offers: Offer[];

getAllOffers(){
  this.adminService.getAllOffers().subscribe(
(response)=>{
console.log(response);
console.log("type = "+typeof(response))
this.offers=response.offers;
console.log("iterable object===" + this.offers);
},
(error)=>{
console.log(error);
}
  );
}
@ViewChild('stockForm', { static: false }) stockForm: NgForm;
ajouterAuStock(){
  console.log('Quantity:', this.stockForm.value['product-quantity']);
  console.log('Quality:', this.stockForm.value['product-quality']);
  console.log('Price:', this.stockForm.value['product-price']);
  console.log('Unit:', this.stockForm.value['product-unit']);
  console.log('Actor Type:', this.stockForm.value['actor-type']);
}



selectOffer(offer:Offer){
this.selectedOffer=offer;
console.log(this.selectedOffer);
}

}
export interface User {
  _id: string;
  cin: string;
  email: string;
  name: string;
  phone: string;
  role: "admin" | "user";
  type:"agriculteur" | "transformateur" | "exportateur";
  state:"approved" | "waiting"
}
export interface agricole {
  _id: string;
  localisation: string;
}

export interface Offer {
  _id: string;
  type: string;
  quantity: number;
  quality: string;
  priceUnit: number;
  unit: string;
  state: string;
  actorType: string;
  actorRef: string;
}





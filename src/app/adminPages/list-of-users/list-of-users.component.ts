import { HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AmdminServiceService } from 'src/app/services/admin-service.service';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.css']
})
export class ListOfUsersComponent implements OnInit {
  http!: HttpClient; start = 0; selectedLength = 5;
  lengths = [5, 10, 15, 20];
  currentPage: number = 1;
  numberOfPages!: number;
  public section: string = '';

  filtrage:boolean;



  validationMessage:boolean=false;   showUpdateUserForm:boolean=true;

  userType: string | null;
  userRole: string | null;

  constructor(private adminService: AmdminServiceService, private route: ActivatedRoute, private authenticationService: AuthenticationServiceService) {
    //diviser slide of functionalities entre les taches de l'administrateur et les fonctionnalités possible pour un utilisateur
    this.userType = this.route.snapshot.queryParamMap.get('userType');
    this.userRole = this.route.snapshot.queryParamMap.get('userRole');
  }

  public users: User[] = [];
  public originalTable!: User[];

  ngOnInit() {
    this.originalTable = [...this.users];
    this.getUsers2();
    this.getAllOffers();
    this.filterUsers();
    this.getUserHavingOffer("64662677013ecbe516a36fec")
  this.authenticationService.userTypeUpdated.subscribe((userRole: string) => {
    this.userRole=userRole;

  });
this.checkUserRole();

  }
  transformateur:boolean;
  checkUserRole() {
    if (this.userRole === 'agriculteur') {
      
    } else if (this.userRole === 'transformateur') {
      this.transformateur=true;
    } else if (this.userRole === 'exportateur') {
    }
  }
 

  public getUsers2(){
    this.adminService.temchiBidhnallah3()
    .subscribe(
      (response) => {
        let text = JSON.stringify(response);
        let users = JSON.parse(text); // convert string response to JSON object
        console.log("this is from getUsers2")
       console.log(users.data);
       this.users=users.data;
      
        return users;
      },
      (error) => {
        console.error(error);
      }
    );
  
  }

  filterValue: string = '';
  sortValue: string = '';

  sortTable() {
    if (this.sortValue === 'name') {
      this.users = this.users.slice().sort(
        (a, b) => a.name.localeCompare(b.name)
      );
    }
  }
  sortTableArrows(param: string, order: string) {
    if (order == "asc") {
      if (param === 'name') {
        this.users = this.users.slice().sort(
          (a, b) => a.name.localeCompare(b.name)
        );
      }
      if (param === 'username') {
        this.users = this.users.slice().sort(
          (a, b) => a.name.localeCompare(b.name)
        );
      }
      if (param === 'email') {
        this.users = this.users.slice().sort(
          (a, b) => a.email.localeCompare(b.name)
        );
      }
    }
    if (order == "des") {
      if (param === 'name') {
        this.users = this.users.slice().sort(
          (a, b) => a.name.localeCompare(b.name)
        ).reverse();
      }
      if (param === 'username') {
        this.users = this.users.slice().sort(
          (a, b) => a.name.localeCompare(b.name)
        ).reverse();
      }
      if (param === 'email') {
        this.users = this.users.slice().sort(
          (a, b) => a.email.localeCompare(b.name)
        ).reverse();
      }
    }
  }
  filtredUsers: User[] = []; filtredOffers:Offer[]; 
  filtredUsersByType: User[] = [];
  applyFilter() {
    if (this.filterValue.length > 0) {

      this.filtredUsers = this.approvedUsers.filter(user =>
        user.name.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        // user.username.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        user.email.toLowerCase().includes(this.filterValue.toLowerCase())
      );
      this.filtredOffers = this.offers.filter(offer =>
        offer.quality.toString() === this.filterValue 
        // user.username.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        // offer.email.toLowerCase().includes(this.filterValue.toLowerCase())
      );
      this.filtredUsersByType=this.usersByType.filter(user =>
        user.name.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        // user.username.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        user.email.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    }

  }
  applyFilterUsersDashbord(){
    if (this.filterValue.length > 0) {
      this.filtredOffers = this.offers.filter(offer =>
        offer.quality.toString() === this.filterValue 

      );
      console.log(this.filtredOffers)
    }
  }

  resetTable() {
    this.filterValue = '';
    this.sortValue = '';
  }
  updateCurrentPage(direction: string) {
    if (direction == "next") {
      this.currentPage += 1;
    }
    if (direction == "back") {
      this.currentPage -= 1;
    }
  }

  getPaginatedData() {
    const startIndex = (this.currentPage - 1) * this.selectedLength;
    this.numberOfPages = Math.ceil(this.approvedUsers.length / this.selectedLength);
    return this.approvedUsers.slice(startIndex, Number(startIndex) + Number(this.selectedLength));

  }

  /** Inscription */
  showSectionInscription: boolean = false;
  /**Gestion Utilisateur */
  showSectionGestionUtilisateur: boolean = true;
 
  /**Gestion Stock */
  showSectionFarmerStock: boolean = false;
  showSectionTransformateurStock: boolean = false;
  showSectionExportateurStock: boolean = false;
  /** Vioalation*/
  showReclamationSection: boolean = false;
  /** historique */
  showhistoriqueAgricolteur: boolean = true;
  showhistoriqueTransformateur: boolean = true;
  showhistoriqueExportateur: boolean = true;
  /** Consuleter */
  showTransformateurs: boolean = false;
  showExportateurs: boolean = false;
  /** Offre */
  showOffreAgricoleur: boolean = false;
  showOffreTransformateur: boolean = false;


  toggleSection(sectionId: string, event: MouseEvent) {
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
      this.showTransformateurs = false;
      this.showExportateurs = false;
      /* stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock = false;
      this.showSectionExportateurStock = false;
      /* Reclamation */
      this.showReclamationSection = true;
      /* Historique */
      this.showhistoriqueAgricolteur = false;
      this.showhistoriqueTransformateur = false;
      this.showhistoriqueExportateur = false;
      /* Appelle d'offre */
      this.showOffreAgricoleur = false;
      this.showOffreTransformateur = false;
      this.filtrage=false;

    }
    if (sectionId === 'historique') {
      /* Show utilisateur */
      this.showTransformateurs = false;
      this.showExportateurs = false;
      /* Stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock = false;
      this.showSectionExportateurStock = false;
      /* Reclamation */
      this.showReclamationSection = false;
      /* Appelle d'offre */
      this.showOffreAgricoleur = false;
      this.showOffreTransformateur = false;
      this.filtrage=true;

    
      if (this.userRole === 'agriculteur') {
        this.showhistoriqueAgricolteur = true;
        this.showhistoriqueTransformateur = false;
        this.showhistoriqueExportateur = false;
        console.log("filtrage yemchi ?"+this.filtrage)
      }
      if (this.userRole === 'transformateur') {
        this.showhistoriqueAgricolteur = false;
        this.showhistoriqueTransformateur = true;
        this.showhistoriqueExportateur = false;
      }
      if (this.userRole === 'exportateur') {
        this.showhistoriqueAgricolteur = false;
        this.showhistoriqueTransformateur = false;
        this.showhistoriqueExportateur = true;
       

      }
    }
    if (sectionId === 'transformateurs') {
      /* Show utilisateur */
      this.showTransformateurs = true;
      this.showExportateurs = false;
    
      /* Stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock = false;
      this.showSectionExportateurStock = false;
      this.filtrage=true;
      /* Reclamation */
      this.showReclamationSection = false;
      /* Historique */
      this.showhistoriqueAgricolteur = false;
      this.showhistoriqueTransformateur = false;
      this.showhistoriqueExportateur = false;
      
      /* Appelle d'offre */
      this.showOffreAgricoleur = false;
      this.showOffreTransformateur = false;
      
    }
    if (sectionId === 'exportateurs') {
      /* show utilisateur */
      this.showTransformateurs = false;
      this.showExportateurs = true;
     this.filtrage=true;
      /* stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock = false;
      this.showSectionExportateurStock = false;
    
      /* Reclamation */
      this.showReclamationSection = false;
      
      /* Historique */
      this.showhistoriqueAgricolteur = false;
      this.showhistoriqueTransformateur = false;
      this.showhistoriqueExportateur = false;
      
      /* Appelle d'offre */
      this.showOffreAgricoleur = false;
      this.showOffreTransformateur = false;
      
    }
    if (sectionId === 'offretransformateur') {
      /* show utilisateur */
      this.showTransformateurs = false;
      this.showExportateurs = false;
      /* stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock = false;
      this.showSectionExportateurStock = false;
      /* Reclamation */
      this.showReclamationSection = false;
      /* Historique */
      this.showhistoriqueAgricolteur = false;
      this.showhistoriqueTransformateur = false;
      this.showhistoriqueExportateur = false;
      /* Appelle d'offre */
      this.showOffreAgricoleur = false;
      this.showOffreTransformateur = true;

      this.filtrage=true;
    }
    if (sectionId === 'offreAgricolteur') {
      /* show utilisateur */
      this.showTransformateurs = false;
      this.showExportateurs = false;
      /* stock */
      this.showSectionFarmerStock = false;
      this.showSectionTransformateurStock = false;
      this.showSectionExportateurStock = false;
      /* Reclamation */
      this.showReclamationSection = false;
      /* Historique */
      this.showhistoriqueAgricolteur = false;
      this.showhistoriqueTransformateur = false;
      this.showhistoriqueExportateur = false;
      /* Appelle d'offre */
      this.showOffreAgricoleur = true;
      this.showOffreTransformateur = false; 
      this.filtrage=true;
    }
    if (sectionId === 'Stock') {
      /* show utilisateur */
      this.showTransformateurs = false;
      this.showExportateurs = false;
      /* Reclamation */
      this.showReclamationSection = false;
      /* Historique */
      this.showhistoriqueAgricolteur = false;
      this.showhistoriqueTransformateur = false;
      this.showhistoriqueExportateur = false;
      /* Appelle d'offre */
      this.showOffreAgricoleur = false;
      this.showOffreTransformateur = true;
      this.filtrage=false;
      if (this.userRole === 'agriculteur') {
        this.showSectionFarmerStock = true;
        this.showSectionTransformateurStock = false;
        this.showSectionExportateurStock = false;
      }
      if (this.userRole === 'transformateur') {
        this.showSectionFarmerStock = false;
        this.showSectionTransformateurStock = true;
        this.showSectionExportateurStock = false;
      }
      if (this.userRole === 'exportateur') {
        this.showSectionFarmerStock = false;
        this.showSectionTransformateurStock = false;
        this.showSectionExportateurStock = true;
      }

    }

  }

  selectedUser: any; selectedOffer: any;
  showModalFlag = false; operation: string | undefined;
  showAboutUser = false;
  showModal(user: any, operation: string) {
    this.selectedUser = user;
    this.showModalFlag = true;
    if (operation === 'edit') {
      this.operation = "edit";
    }
    if (operation === 'delete') {
      this.operation = "delete";
    }
    if (operation === 'stats') {
      this.operation = "stats";
    }
    if (operation === 'moreDetails') {
      this.operation = "moreDetails";
    }
  }
 
  updateStockMode: boolean = false;
  showUpdateStock() {
    this.showModalFlag = true;
    this.updateStockMode = true;
  }

  hideModal() {
    if (this.selectedUser) {
      this.selectedUser = null;
    }
    this.showModalFlag = false;
   
  }


  quantity: number; quality: string; price: number;

  stock = [
    { quality: 'High', quantity: 1000, price: 5.00 },
    { quality: 'Medium', quantity: 500, price: 3.00 },
    { quality: 'Low', quantity: 200, price: 1.50 }
  ];
  updatedQuantity:string; 
  @ViewChild('UpdateStockForm', { static: false }) UpdateStockForm: NgForm;
  productQuantity: number;
  productQuality: string;
  productPrice: number;
  productUnit: number;
  actorType: string;
  state: string;
  updateStock(offerId: string) {
    const formValues = {
      quantity: this.productQuantity,
    }; 

    this.adminService.updateOffer(offerId, formValues)
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
      

    console.log('Quantity:', this.UpdatestockForm.value['product-quantity']);
    console.log('Quality:', this.UpdatestockForm.value['product-quality']);
    console.log('Price:', this.UpdatestockForm.value['product-price']);
    console.log('Unit:', this.UpdatestockForm.value['product-unit']);
    console.log('Actor Type:', this.UpdatestockForm.value['actor-type']);



  }

  

  role: string;
  affecterRole(role: string) {
    this.role = role;
  }

  @ViewChild('UpdatestockForm', { static: false }) UpdatestockForm: NgForm;
  showUpdateStockValues() {
    console.log('Quantity:', this.UpdatestockForm.value['product-quantity']);
    console.log('Quality:', this.UpdatestockForm.value['product-quality']);
    console.log('Price:', this.UpdatestockForm.value['product-price']);
    console.log('Unit:', this.UpdatestockForm.value['product-unit']);
    console.log('Actor Type:', this.UpdatestockForm.value['actor-type']);

  }


  Farmers = this.adminService.getAllFarmers();

  public agricols: agricole[] = [];

  getAgricoles(): void {
    this.adminService.getAgricoles().subscribe(
      (response) => {
        this.agricols = response.agricoles;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  deleteAgricole(id: string) {
    this.adminService.deleteAgricole(id);
  }


  deleteUser2(id: string): void {
    const url = `http://localhost:5000/api/admin/users/${id}`;
    this.adminService.deleteUser2(id).subscribe(
      (response) => {
        this.getUsers2();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updatedName: string; updatedCin: string; updatedEmail: string;
  updatedPhone: string; updatedRole: string; updatedType: string; updatedState: string;
  updateUserValues() {
    console.log("this is update function");
    console.log(this.updatedName);
    console.log(this.updatedCin);
    console.log(this.updatedPhone);
    console.log(this.updatedRole);
    console.log(this.updatedEmail);
    console.log(this.updatedType);
  }


  updateUser(userId: string) {

    const payload = {
      cin: this.updatedCin,
      name: this.updatedName,
      email: this.updatedEmail,
      phone: this.updatedPhone,
      role: this.updatedRole,
      type: this.updatedType,
    };


    this.adminService.updateUser(userId, payload)
      .subscribe(
        response => {

          console.log('Update request successful', response);
          this.getUsers2();
          this.validationMessage=true;
          this.showUpdateUserForm=false;
          this.showModalFlag=false;

          setTimeout(() => {
            this.validationMessage=false;
          }, 2000);
          
          // Perform further actions if needed
        },
        error => {
          console.error('Update request error', error);
          // Handle error scenarios if needed
        }
      );
  }


  accepterUser(userId:any){
    const updateData={
      "state":"approved"
    }
    this.adminService.updateUser(userId, updateData).subscribe(
      (response) => {
        this.getUsers2();
        console.log('User updated');
      },
      (error) => {
        console.error('An error occurred', error);
      }
    );
  }
  



  offers: Offer[];  usersHavingOffers:User;
  getAllOffers() {
    this.adminService.getAllOffers().subscribe(
      (response) => {
        this.offers=response.data;
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteOffer(id:string){
   console.log("id=="+id)
    this.adminService.deleteOffer(id).subscribe(
    (Response) =>{
      this.getAllOffers();
    },
    (error) => {
      console.log(error);
    }
    )
    this.getAllOffers()
  }

  getUserHavingOffer(actorRef:string){
    this.adminService.temchiBidhnallah3()
    .subscribe(
      (response) => {
        let text = JSON.stringify(response);
        let users = JSON.parse(text); // convert string response to JSON object
        console.log("this is from getUsers2")
       console.log(users.data);
       this.usersHavingOffers=users.data;
        return this.usersHavingOffers;
      },
      (error) => {
        console.error(error);
      }
    );
   
  }
  @ViewChild('stockForm', { static: false }) stockForm: NgForm;
  ajouterAuStock() {
    console.log('Quantity:', this.stockForm.value['product-quantity']);
    console.log('Quality:', this.stockForm.value['product-quality']);
    console.log('Price:', this.stockForm.value['product-price']);
    console.log('Unit:', this.stockForm.value['product-unit']);
    console.log('state:', this.stockForm.value['product-state']);
    console.log('Actor Type:', this.stockForm.value['actor-type']);
  }

  ajouterOffreAgriculteur(){
    this.adminService.ajouterOffreAgriculteur(this.stockForm).subscribe(
        (response) => {
          // Handle success response
          this.getAllOffers();
          console.log('Offer added successfully:', response);
          // Reset the form if needed
        },
        (error) => {
          // Handle error response
          console.error('Error adding offer:', error);
        }
      );
  }



  selectOffer(offer: any) {
    this.selectedOffer = offer;
    console.log("selected Offer quantity"+this.selectedOffer.quantity);
    console.log("selected Offer2"+this.selectedOffer);
  }
  selectUser(id: any) {
    // this.selectedUser = user;
    console.log("id mta3 l user li theb tnahih"+id);
  }

waitingUsers:User[]; approvedUsers:User[];
  filterUsers() {
    const state = 'waiting';
    this.adminService.filterUsers(state).subscribe(
      (response) => {
        console.log('Filtered users:', response);
        this.waitingUsers=response.data;
        // Handle the response data
      },
      (error) => {
        console.error('An error occurred', error);
        // Handle the error
      }
    );
    
    this.adminService.filterUsers("approved").subscribe(
      (response) => {
        console.log("=======from filtred users-----------")
        console.log('Filtered users:', response);
        this.approvedUsers=response.data;
        // Handle the response data
      },
      (error) => {
        console.error('An error occurred', error);
        // Handle the error
      }
    );
  }
usersByType:User[];
  consulterUserByType(userType:string){
    // let userType="transformateur";
    this.adminService.getUserByType(userType).subscribe(
      (response) => {
        // Handle the response here
        console.log("users filtred by type")
        console.log(response);
        this.usersByType=response.data;

      },
      (error) => {
        // Handle errors here
        console.log("fama mochkel fil transformateurs")
        console.error(error);
      }
    );
    }
    getUserByReference(reference:string){
      this.adminService.getUserByReference(reference).subscribe(
        (response) => {
          // Handle the response here
          this.usersHavingOffers=response.data;

        },
        (error) => {
          // Handle errors here
          console.error(error);
        }
      );
    }

filtredOffersByActor:Offer[];
filterOffers2(condition:string):Offer[]{
  this.adminService.filterOffers2(condition)
  .subscribe(response => {
    // Handle the response data here

    console.log(response);
    this.filtredOffersByActor=response.data;
    console.log("filtred offers by actor   "+this.filtredOffersByActor[0]._id)
    
  }, error => {
    // Handle any errors here
    console.error(error);
  });
  return this.filtredOffersByActor;
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
  // state:"approved" | "waiting"
  public_key: string;
  // role: string;
  // type: string;
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





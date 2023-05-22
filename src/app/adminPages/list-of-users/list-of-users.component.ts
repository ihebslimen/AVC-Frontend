import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
    this.getAllOffers()
    this.filterUsers()
    console.log("approved users ::::::"+this.approvedUsers);
     console.log("hné")
   this.getUserHavingOffer("64662677013ecbe516a36fec")
   console.log("hné")
  // this.consulterUserByType();
  this.authenticationService.userTypeUpdated.subscribe((userRole: string) => {
    // Handle the updated userType value
    console.log("Received userType in Dashboard:",userRole);
    this.userRole=userRole;
    // Perform any necessary actions based on userType (e.g., displaying specific content)
    console.log("user type mte3o howa:======>"+this.userRole)
   
console.log("l'acteur mta3 ref hedhi-------->"+this.getUserByReference("64662677013ecbe516a36fec"));
  });
this.checkUserRole();
console.log("trns bool::::"+this.transformateur)
  }
  transformateur:boolean;
  checkUserRole() {
    // Use the updated userRole value for any necessary logic
    if (this.userRole === 'agriculteur') {
      
    } else if (this.userRole === 'transformateur') {
      this.transformateur=true;
      // Do something specific for 'transformateur'
    } else if (this.userRole === 'exportateur') {
      // Do something specific for 'exportateur'
    }
  }
  // assignRole(){
  //     if (this.userRole === 'admin') {
  //       // Assign items for admin user
  //       this.userItems = this.adminItems;
  //     } else if (this.userRole === 'user') {
  //       // Assign items for regular user
  //       this.userItems = this.userItems;
  //     } else {
  //       // Assign items for other user roles
  //       this.userItems = this.otherItems;
  //     }
  // }
 
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQyYmEyMzA0ZWE5OWIwMjIyMjdmMTBlIiwicm9sZSI6ImFkbWluIiwiZXhwIjoyNTM0MDIyMTQ0MDB9.17tI_G0dL2LVdfEcY2m4DyvNd6_mV-d0YcJ7AWApPto'
    })
  };
  

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
  // filterName:string=""; filterUsername:string=""; filterEmail:string=""; filteredUsers = this.users;
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
console.log(this.offers)
      this.filtredOffers = this.offers.filter(offer =>
        offer.quality.toString() === this.filterValue 
        // user.username.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        // offer.email.toLowerCase().includes(this.filterValue.toLowerCase())
      );
      console.log(this.filtredOffers)
    }
  }

  resetTable() {
    console.log(this.originalTable);
    // this.users = this.getUsers();
    // this.filterName = '';
    // this.filterUsername = '';
    // this.filterEmail = '';
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
    console.log("number of pages"+this.numberOfPages)
    // return this.users.slice(startIndex, Number(startIndex) + Number(this.selectedLength));
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
      this.filtrage=true;
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
      this.filtrage=false;
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


    // console.log(this.showSection);
  }
  //todo fazet ki tenzel 3al bouton yo5rjo informations
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
    console.log("operation==" + this.operation);
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




  quantity: number; quality: string; price: number;

  stock = [
    { quality: 'High', quantity: 1000, price: 5.00 },
    { quality: 'Medium', quantity: 500, price: 3.00 },
    { quality: 'Low', quantity: 200, price: 1.50 }
  ];

  @ViewChild('UpdateStockForm', { static: false }) UpdateStockForm: NgForm;
  updateStock(offerId: string) {
    const requestBody = {
      updatedQuantity: this.UpdateStockForm.value['product-quantity'],
      Quality: this.UpdateStockForm.value['product-quality'],
      Price: this.UpdateStockForm.value['product-price'],
      Unit: this.UpdateStockForm.value['product-unit'],
      updatedState: this.UpdateStockForm.value['state'],
      Actor_Type: this.UpdateStockForm.value['actor-type'],
      updatedRef: this.UpdateStockForm.value['actor-ref'],
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






  // ajouterUtilisateur() {
  //   this.adminService.ajouterUtilisateur();
  // }

  Farmers = this.adminService.getAllFarmers();

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


  deleteAgricole(id: string) {
    this.adminService.deleteAgricole(id);
  }
  deleteUser(id: string) {
    console.log("id = " + id);
    this.adminService.deleteUser(id);
  }


  deleteUser2(id: string): void {
    const url = `http://localhost:5000/api/admin/users/${id}`;
console.log("id to delete----->"+id);
    this.adminService.deleteUser2(id).subscribe(
      (response) => {
        console.log('User deleted successfully');
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
        console.log("----------getAllOffers----------")
        this.offers=response.data;
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getUserHavingOffer(actorRef:string){
    // this.adminService.filterUsers(actorRef).subscribe(
    //   (response) => {
    //     return response.data[0];
    
    //     // Handle the response data
    //   },
    //   (error) => {
    //     console.error('An error occurred', error);
    //     // Handle the error
    //   }
    // );
    this.adminService.temchiBidhnallah3()
    .subscribe(
      (response) => {
        let text = JSON.stringify(response);
        let users = JSON.parse(text); // convert string response to JSON object
        console.log("this is from getUsers2")
       console.log(users.data);
       this.usersHavingOffers=users.data;
       console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
       // this.usersHavingOffers=this.users.filter(user=>user._id.toString() === actorRef)[0];
      
      // console.log("users having ooffer"+this.usersHavingOffers)   
        return this.usersHavingOffers;
      },
      (error) => {
        console.error(error);
      }
    );
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
    // this.usersHavingOffers=this.users.filter(user=>user._id.toString() === actorRef)[0];
   
   console.log("users having ooffer"+this.usersHavingOffers)
   
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
          
          console.log('Offer added successfully:', response);
          // Reset the form if needed
        },
        (error) => {
          // Handle error response
          console.error('Error adding offer:', error);
        }
      );
  }



  selectOffer(offer: Offer) {
    this.selectedOffer = offer;
    console.log(this.selectedOffer);
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
        console.log("=======from filtred users-----------")
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
        // this.usersByType=response.data;
        // return response;
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
          console.log("users filtred by type")
          console.log(response);
          this.usersHavingOffers=response.data;
          // this.usersByType=response.data;
          // return response;
        },
        (error) => {
          // Handle errors here
          console.log("fama mochkel fil transformateurs")
          console.error(error);
        }
      );
    }
// todo
//placeholder w bara
    offreAgriculteurs = [
      {
        name: "Ahmad",
        telephone: "92045912",
        quality: "Excellent",
        quantityInStock: 10,
        price: 50,
      },
      {
        name: "Mohammad",
        telephone: "239951678",
        quality: "haut",
        quantityInStock: 5,
        price: 40,
      },
      {
        name: "Ali",
        telephone: "22345810",
        quality: "haut",
        quantityInStock: 8,
        price: 60,
      },
      {
        name: "Fatima",
        telephone: "55628920",
        quality: "moyen",
        quantityInStock: 12,
        price: 45,
      },
      {
        name: "Nour",
        telephone: "567890123",
        quality: "Excellent",
        quantityInStock: 3,
        price: 55,
      },
    ];  
    quantiteTransformateur = [
      {
        name: "Youssef",
        telephone: "923454280",
        quality: "haut",
        quantityInStock: 15,
        price: 55,
      },
      {
        name: "Omar",
        telephone: "234064891",
        quality: "haut",
        quantityInStock: 7,
        price: 38,
      },
      {
        name: "Hassan",
        telephone: "94578034",
        quality: "Excellent",
        quantityInStock: 6,
        price: 62,
      },
      {
        name: "Amina",
        telephone: "25159012",
        quality: "moyen",
        quantityInStock: 10,
        price: 48,
      },
      {
        name: "Layla",
        telephone: "587810827",
        quality: "haut",
        quantityInStock: 5,
        price: 60,
      },
    ];  


    listeAccords=[
      {
        nom: "Youssef",
        telephone: "253456789",
        quantite: 8,
        qualite: "Très bonne",
        prix: 65,
      },
      {
        nom: "Karim",
        telephone: "234567890",
        quantite: 12,
        qualite: "Élevée",
        prix: 55,
      },
      {
        nom: "Hassan",
        telephone: "9945678901",
        quantite: 6,
        qualite: "Bonne",
        prix: 45,
      },
      {
        nom: "Rania",
        telephone: "556789012",
        quantite: 10,
        qualite: "Moyenne",
        prix: 40,
      },
      {
        nom: "Samira",
        telephone: "567890123",
        quantite: 4,
        qualite: "Très bonne",
        prix: 70,
      },
    ];

AccordsAgriculteurs=[
  {
    nom: "Sami",
    telephone: "123456789",
    quantite: 15,
    qualite: "Très bonne",
    prix: 60,
  },
  {
    nom: "Karima",
    telephone: "234567890",
    quantite: 7,
    qualite: "Élevée",
    prix: 50,
  },
  {
    nom: "Rachid",
    telephone: "0345678901",
    quantite: 9,
    qualite: "Bonne",
    prix: 55,
  },
  {
    nom: "Leila",
    telephone: "956589002",
    quantite: 13,
    qualite: "Moyenne",
    prix: 45,
  },
  {
    nom: "Nadia",
    telephone: "5678732123",
    quantite: 5,
    qualite: "Très bonne",
    prix: 65,
  },
];


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





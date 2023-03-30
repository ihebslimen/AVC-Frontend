import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProfileComponent } from './adminPages/admin-profile/admin-profile.component';
import { ListOfUsersComponent } from './adminPages/list-of-users/list-of-users.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IsAdminRouteGuardService } from './services/routeGuardservices/is-admin-route-guard.service';
const routes: Routes = [
  {path:"header",component:HeaderComponent},
  {path:"contact",component:ContactComponent},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"",component:HomeComponent},
  {path:"admin",component:AdminProfileComponent,canActivate:[IsAdminRouteGuardService]},
  {path:"listOfUsers",component:ListOfUsersComponent},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

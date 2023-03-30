import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminRouteGuardService implements CanActivate {

  constructor() { }
  canActivate(
    // route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    )
    {
    // throw new Error('Method not implemented.');
    return true;
  }
}

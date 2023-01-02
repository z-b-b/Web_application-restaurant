import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IsLoggedService } from './is-logged.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private auth_service: IsLoggedService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let is_auth: boolean = this.auth_service.Is_Authenticated();

        if (is_auth)
            return true;
        else {
            this.router.navigate(['/login'], {queryParams: {auth: false}});
            return false;
        }
    }
}
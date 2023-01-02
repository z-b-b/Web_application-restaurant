import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class IsLoggedService {
    private is_auth: boolean = false;

    constructor() { }
    
    Is_Authenticated() {
      return this.is_auth;
    }

    is_user_logged_in = new Subject();
    
    Set_User_Logged_In(logged_in: boolean) {
      this.is_auth = logged_in;
      return this.is_user_logged_in.next(logged_in);
    }
}
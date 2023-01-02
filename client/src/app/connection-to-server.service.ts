import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { user } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ConnectionToServerService {
  // כתובת מקבילה ללקוח עם פורט שונה שמאזין השרת
  REGISTER_URL        = "http://localhost:8080/register";
  LOGIN_URL           = "http://localhost:8080/login";
  ORDERS_URL          = "http://localhost:8080/orders";
  PREVIOUS_ORDERS_URL = "http://localhost:8080/previous-orders";
  
  http_options = {
    headers: new HttpHeaders({"Content-type": "application/json"})
  };

  private currentUserSubject: BehaviorSubject<user>;
  public  currentUser       : Observable<user>     ;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<user>(JSON.parse(String(localStorage.getItem('currentUser'))));
    this.currentUser        = this.currentUserSubject.asObservable();
  }

  /* CRUD: users */
  Post_User(new_user: any) { 
    return this.http.post<any>(this.REGISTER_URL, JSON.stringify({data: new_user}), this.http_options).pipe(map(user => {      
              // אחסן את פרטי המשתמש והאסימון באחסון המקומי כדי לשמור על המשתמש מחובר בין רענון הדף
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
    }));
  }
  
  Get_User(exist_user: any) {
    return this.http.post<any>(this.LOGIN_URL, JSON.stringify({data: exist_user}), this.http_options).pipe(map(user => {      
              // אחסן את פרטי המשתמש והאסימון באחסון המקומי כדי לשמור על המשתמש מחובר בין רענון הדף
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
    }));
  }
  /* END CRUD: users */
  
  /* CRUD: orders */
  Post_Order(new_order: any) {
    return this.http.post<any>(this.ORDERS_URL, JSON.stringify({data: new_order}), this.http_options);
  }

  Get_Orders() {
    return this.http.get<any>(this.PREVIOUS_ORDERS_URL);  
  }
  /* END CRUD: orders */

  Logout() {
    // הסר את המשתמש מהאחסון המקומי כדי להתנתק מהמשתמש
    let remove_current_user: user = {
      _id:           null ,
      user_email:    ""   ,
      user_password: ""   ,
      flag:          false,
      token:         ""
    }
  
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(remove_current_user);
  }
}
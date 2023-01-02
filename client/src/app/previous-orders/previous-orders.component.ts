import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ConnectionToServerService } from '../connection-to-server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {
  // שמירת הדו"אל של המשתמש המחובר במשתנה
  logged_in_email: any;

  // שמירת ההזמנות הקודמות של המשתמש המחובר במערך
  previous_user_orders: any = [];

  // כותרת החלון
  public constructor(private title_service: Title, private authenticationService: ConnectionToServerService,
                     private router: Router) {
    this.title_service.setTitle("Previous Orders");
  }

  ngOnInit() {
    // איחזור הדו"אל של המשתמש המחובר מהדפדפן
    this.logged_in_email = sessionStorage.getItem("save_logged_in_email");

    // איחזור כל ההזמנות מהשרת
    this.authenticationService.Get_Orders().subscribe((all_previous_orders: any) => { 
      
      // מציאת ההזמנות השייכות לדו"אל המחובר
      all_previous_orders.forEach((order: { user_email: any; }) => {
        if (this.logged_in_email == order.user_email) 
          this.previous_user_orders.push(order);
      });
    });
  }
}
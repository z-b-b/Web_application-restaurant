import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ConnectionToServerService } from '../connection-to-server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  // דו"אל של המשתמש המחובר
  user_email: string = "";
  
  // מערך של כל הפריטים
  all_items: any;

  // מערך של פריטים שנבחרו
  selected_items: any = [];
  
  // כותרת החלון
  public constructor(private title_service: Title, private authenticationService: ConnectionToServerService, private router: Router) {
    this.title_service.setTitle("Orders");
  }

  ngOnInit(): void { 
    // שמירת הדו"אל וצירופו להזמנה בהמשך
    this.user_email = history.state.user_email;

    // שמירת מערך כל הפריטים מרכיב התפריט
    this.all_items = JSON.parse(history.state.data);

    // סינון מערך כל הפריטים רק לפריטים שנבחרו
    for (const item in this.all_items) 
      if (this.all_items[item].selected_item != "") {
        let order = {
                      user_email: this.user_email,
                      item: this.all_items[item]
            }; 

        this.selected_items.push(order);
      }
  }

  // שמירת ההזמנה בשרת
  Save_Order_On_Server(): void {
    this.authenticationService.Post_Order(this.selected_items).subscribe((result: any) => {
      alert("Order saved on server!"); 
    });

    this.router.navigate(["/home"], {state: {links: true}});
  }
}
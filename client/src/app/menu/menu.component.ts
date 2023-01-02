import { Title } from '@angular/platform-browser';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { items_and_amount } from '../interfaces/items_and_amount';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  // מערך של אובייקטים: מאכלים
  restaurant_menu = [
                      {
                        dish_name: "Cutlet",
                        price: "54"
                      },
                      {
                        dish_name: "Bagel and coffee",
                        price: "34"
                      },
                      {
                        dish_name: "Salad",
                        price: "51"
                      },
                      {
                        dish_name: "Omelet",
                        price: "45"
                      },
                      {
                        dish_name: "Smoked salmon",
                        price: "56"
                      },
                      {
                        dish_name: "Crispy toast",
                        price: "40"  
                      }
                    ];

  // גישה לפקדים: תיבת הסימון ותיבת הטקסט של המאכלים
  @ViewChild("item1") item1!: ElementRef;
  @ViewChild("item2") item2!: ElementRef;
  @ViewChild("item3") item3!: ElementRef;
  @ViewChild("item4") item4!: ElementRef;
  @ViewChild("item5") item5!: ElementRef;
  @ViewChild("item6") item6!: ElementRef;

  @ViewChild("item1_amount") item1_amount!: ElementRef;
  @ViewChild("item2_amount") item2_amount!: ElementRef;
  @ViewChild("item3_amount") item3_amount!: ElementRef;
  @ViewChild("item4_amount") item4_amount!: ElementRef;
  @ViewChild("item5_amount") item5_amount!: ElementRef;
  @ViewChild("item6_amount") item6_amount!: ElementRef;

  // מאכלים שהמשתמש בחר מתוך התפריט לביצוע ההזמנה
  foods_selected_by_user: items_and_amount[] = [];

  // orders האם הכנסת הנתונים נכונה? אם כן העתקת ההזמנה לדף
  is_ok: boolean = false;

  // כותרת החלון
  public constructor(private title_service: Title, private router: Router) {
    this.title_service.setTitle("Menu");
  }

  // בדיקה והעברת הנתונים לרכיב ההזמנה - המשתמש בחר מאכלים להזמנה
  Confirm(): void { 
    for (let object_number = 0; object_number < this.restaurant_menu.length; object_number++) {
      this.foods_selected_by_user[object_number] = {selected_item: '', amount: 0, price: 0, date_time: ''};
    }

    if (this.item1.nativeElement.checked == true)
      if ((this.item1_amount.nativeElement.value == true) && (this.item1_amount.nativeElement.value != 1) ||
          (this.item1_amount.nativeElement.value == null) ||
          (this.item1_amount.nativeElement.value == '')   ||
          (isNaN(this.item1_amount.nativeElement.value))  ||
          ((this.item1_amount.nativeElement.value) <= 0)  ||
          ((this.item1_amount.nativeElement.value) % 1 != 0)) {
            
            alert("Item No.1 Quantity Incorrect!");
            this.is_ok = false;
          }
          else {
            this.foods_selected_by_user[0].selected_item = this.restaurant_menu[0].dish_name;
            this.foods_selected_by_user[0].amount = Number(this.item1_amount.nativeElement.value);
            this.foods_selected_by_user[0].price  = Number(this.foods_selected_by_user[0].amount) *
                                                    Number(this.restaurant_menu[0].price);
            this.foods_selected_by_user[0].date_time = Date().toString();
            this.is_ok = true;
          }

    if ((this.item1_amount.nativeElement.value != '') && (this.item1.nativeElement.checked == false)) {
      alert("Item No.1 not selected!");
      this.is_ok = false;
    }
    
    if (this.item2.nativeElement.checked == true)
      if ((this.item2_amount.nativeElement.value == true) && (this.item2_amount.nativeElement.value != 1) ||
          (this.item2_amount.nativeElement.value == null) ||
          (this.item2_amount.nativeElement.value == '')   ||
          (isNaN(this.item2_amount.nativeElement.value))  ||
          (this.item2_amount.nativeElement.value <= 0)    ||
          (this.item2_amount.nativeElement.value % 1 != 0)) {
            
            alert("Item No.2 Quantity Incorrect!");
            this.is_ok = false;
          }
          else {
            this.foods_selected_by_user[1].selected_item = this.restaurant_menu[1].dish_name;
            this.foods_selected_by_user[1].amount = Number(this.item2_amount.nativeElement.value);
            this.foods_selected_by_user[1].price  = Number(this.foods_selected_by_user[1].amount) *
                                                    Number(this.restaurant_menu[1].price);
            this.foods_selected_by_user[1].date_time = Date().toString();
            this.is_ok = true;
          } 
          
    if ((this.item2_amount.nativeElement.value != '') && (this.item2.nativeElement.checked == false)) {
      alert("Item No.2 not selected!");
      this.is_ok = false;
    }
    
    if (this.item3.nativeElement.checked == true)
      if ((this.item3_amount.nativeElement.value == true) && (this.item3_amount.nativeElement.value != 1) ||
          (this.item3_amount.nativeElement.value == null) ||
          (this.item3_amount.nativeElement.value == '')   ||
          (isNaN(this.item3_amount.nativeElement.value))  ||
          (this.item3_amount.nativeElement.value <= 0)    ||
          (this.item3_amount.nativeElement.value % 1 != 0)) {
            
            alert("Item No.3 Quantity Incorrect!");
            this.is_ok = false;
          }
          else {
            this.foods_selected_by_user[2].selected_item = this.restaurant_menu[2].dish_name;
            this.foods_selected_by_user[2].amount = Number(this.item3_amount.nativeElement.value);
            this.foods_selected_by_user[2].price  = Number(this.foods_selected_by_user[2].amount) *
                                                    Number(this.restaurant_menu[2].price);
            this.foods_selected_by_user[2].date_time = Date().toString();
            this.is_ok = true;
          } 
            
    if ((this.item3_amount.nativeElement.value != '') && (this.item3.nativeElement.checked == false)) {
      alert("Item No.3 not selected!");
      this.is_ok = false;
    }

    if (this.item4.nativeElement.checked == true)
      if ((this.item4_amount.nativeElement.value == true) && (this.item4_amount.nativeElement.value != 1) ||
          (this.item4_amount.nativeElement.value == null) ||
          (this.item4_amount.nativeElement.value == '')   ||
          (isNaN(this.item4_amount.nativeElement.value))  ||
          (this.item4_amount.nativeElement.value <= 0)    ||
          (this.item4_amount.nativeElement.value % 1 != 0)) {
            
            alert("Item No.4 Quantity Incorrect!");
            this.is_ok = false;
          }
          else {
            this.foods_selected_by_user[3].selected_item = this.restaurant_menu[3].dish_name;
            this.foods_selected_by_user[3].amount = Number(this.item4_amount.nativeElement.value);
            this.foods_selected_by_user[3].price  = Number(this.foods_selected_by_user[3].amount) *
                                                    Number(this.restaurant_menu[3].price);
            this.foods_selected_by_user[3].date_time = Date().toString();
            this.is_ok = true;
          }

    if ((this.item4_amount.nativeElement.value != '') && (this.item4.nativeElement.checked == false)) {
      alert("Item No.4 not selected!");
      this.is_ok = false;
    }

    if (this.item5.nativeElement.checked == true)
      if ((this.item5_amount.nativeElement.value == true) && (this.item5_amount.nativeElement.value != 1) ||
          (this.item5_amount.nativeElement.value == null) ||
          (this.item5_amount.nativeElement.value == '')   ||
          (isNaN(this.item5_amount.nativeElement.value))  ||
          (this.item5_amount.nativeElement.value <= 0)    ||
          (this.item5_amount.nativeElement.value % 1 != 0)) {
            
            alert("Item No.5 Quantity Incorrect!");
            this.is_ok = false;
          }
          else {
            this.foods_selected_by_user[4].selected_item = this.restaurant_menu[4].dish_name;
            this.foods_selected_by_user[4].amount = Number(this.item5_amount.nativeElement.value);
            this.foods_selected_by_user[4].price  = Number(this.foods_selected_by_user[4].amount) *
                                                    Number(this.restaurant_menu[4].price);
            this.foods_selected_by_user[4].date_time = Date().toString();
            this.is_ok = true;
          }
            
    if ((this.item5_amount.nativeElement.value != '') && (this.item5.nativeElement.checked == false)) {
      alert("Item No.5 not selected!");
      this.is_ok = false;
    }

    if (this.item6.nativeElement.checked == true)
      if ((this.item6_amount.nativeElement.value == true) && (this.item6_amount.nativeElement.value != 1) ||
          (this.item6_amount.nativeElement.value == null) ||
          (this.item6_amount.nativeElement.value == '')   ||
          (isNaN(this.item6_amount.nativeElement.value))  ||
          (this.item6_amount.nativeElement.value <= 0)    ||
          (this.item6_amount.nativeElement.value % 1 != 0)) {
            
            alert("Item No.6 Quantity Incorrect!");
            this.is_ok = false;
          }
          else {
            this.foods_selected_by_user[5].selected_item = this.restaurant_menu[5].dish_name;
            this.foods_selected_by_user[5].amount = Number(this.item6_amount.nativeElement.value);
            this.foods_selected_by_user[5].price  = Number(this.foods_selected_by_user[5].amount) *
                                                    Number(this.restaurant_menu[5].price);
            this.foods_selected_by_user[5].date_time = Date().toString();
            this.is_ok = true;
          }
            
    if ((this.item6_amount.nativeElement.value != '') && (this.item6.nativeElement.checked == false)) {
      alert("Item No.6 not selected!");
      this.is_ok = false;
    }

    // orders ניתוב הנתונים לדף 
    if (this.is_ok === true) 
      this.router.navigate(["/orders"], {state: {user_email: history.state.user_email, data: JSON.stringify(this.foods_selected_by_user)}});
         
    this.is_ok = false;
  }

  // המשתמש בחר לבטל את המאכלים להזמנה
  Cancel(): void {
    this.item1.nativeElement.checked = false;
    this.item2.nativeElement.checked = false;
    this.item3.nativeElement.checked = false;
    this.item4.nativeElement.checked = false;
    this.item5.nativeElement.checked = false;
    this.item6.nativeElement.checked = false;

    this.item1_amount.nativeElement.value = "";
    this.item2_amount.nativeElement.value = "";
    this.item3_amount.nativeElement.value = "";
    this.item4_amount.nativeElement.value = "";
    this.item5_amount.nativeElement.value = "";
    this.item6_amount.nativeElement.value = "";
  }
}
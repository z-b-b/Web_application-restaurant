import { Title } from '@angular/platform-browser';
import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionToServerService } from "../connection-to-server.service";
import { IsLoggedService } from '../is-logged.service';

import { user } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements DoCheck {
  currentUser!: user;

  // יצירת וואבסוקט חדש לצ'אט
  ws = new WebSocket("ws://localhost:8082");
  
  // ערכי הצ'אט
  panel: any; 
  message: any;
  message_index: number = 0;

  // ערכים מרכיב הלוגאין
  show_links: boolean = false;
  user_email: string = "";

  // כותרת החלון ומאזין לצ'ט
  public constructor(private title_service: Title,
                     private router: Router,
                     private authenticationService: ConnectionToServerService,
                     private is_logged_service: IsLoggedService) {
                     
    this.title_service.setTitle("Home");

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.is_logged_service.Set_User_Logged_In(true);

    this.ws.addEventListener("open", () => {
      console.log("Connected to chat server!");
    });

    // מסר משרת הצ'ט ללקוח
    this.ws.addEventListener("message", ({data}) => {
      this.panel = document.getElementById('messages');

      this.message = document.createElement('li');
      this.message.id = String(this.message_index);
      this.message.textContent = data;
      
      this.panel.append(this.message);

      // המסר הבא
      this.message_index++;
    })
  }

  // לאחר הלוגאין הצגת יתר הקישוריות וקבלת הדו"אל של המשתמש
  ngDoCheck() {
    this.show_links = history.state.links;
    this.user_email = history.state.user_email;
  }

  // שליחת הדו"אל של המשתמש המחובר לרכיב התפריט
  Send_User_Email_To_Menu() {
    this.router.navigate(["/menu"], {state: {user_email: this.user_email}});
  }

  // הוספת הודעת צ'אט לרשימת ההודעות
  Add_Message(text_box_value: string): void {
    this.panel = document.getElementById('messages');

    this.message = document.createElement('li');
    this.message.id = String(this.message_index);
    this.message.textContent = text_box_value;
    
    this.panel.append(this.message);
      
    // העברת המסר מהלקוח לשרת הצ'אט
    this.ws.send(text_box_value);
    
    // המסר הבא
    this.message_index++;
  }

  // מחיקת כל ההודעות
  Delete_Messages(): void {
    let panel: any, message: any, textbox: any;

    textbox = document.getElementById('message_box');
    textbox.value = '';

    for (let index = 0; index < this.message_index; index++) {
      message = document.getElementById(String(index));
      message.parentNode.removeChild(message); 
    }
  
    this.message_index = 0;
  }

  // ניתוק משתמש
  Logout() {
    this.is_logged_service.Set_User_Logged_In(false);
    this.authenticationService.Logout();
  }
}
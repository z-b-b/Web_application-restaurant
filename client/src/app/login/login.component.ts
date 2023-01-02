import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionToServerService } from '../connection-to-server.service';
import { IsLoggedService } from '../is-logged.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // כותרת החלון
  public constructor(private title_service: Title,
                     private router: Router,
                     private authenticationService: ConnectionToServerService,
                     private is_logged_service: IsLoggedService) {
    
    this.title_service.setTitle("Login");
  }

  // בדיקת נתוני הטופס ושיוך לאפשרות המתאימה
  Check_Form_Associate_Option(email: string, password: string, option: string): void {
    if ((email.search('@') < 1) || (email.length < 3))
      alert("Invalid email");
    
    if (password.length < 4)
      alert("Invalid password: The password must be at least 4 characters long");

    let new_user_or_exist_user = { user_email: email, user_password: password };

    if (option == 's')
      this.Sign_In(new_user_or_exist_user);  
    else
      this.Register(new_user_or_exist_user); 
  }

  // חיבור משתמש קיים
  Sign_In(exist_user: any): void {
    this.authenticationService.Get_User(exist_user).subscribe((result: any) => { 
      if (result.flag) {
        // שמירת נתונים בזיכרון הדפדפן
        sessionStorage.setItem("save_logged_in_email", exist_user.user_email);

        // משתמש מחובר
        this.is_logged_service.Set_User_Logged_In(true);
        
        // ניתוב לדף הבית משתמש התחבר בהצלחה
        alert("User exist! User logged in!");
        this.router.navigate(["/home"], {state: {links: true, user_email: exist_user.user_email}});
      }
    });
  }

  // רישום משתמש חדש
  Register(new_user: any): void {
    if (new_user.user_email == "" || new_user.user_password == "")
        alert("Blank username or password!");
    else {
        this.authenticationService.Post_User(new_user).subscribe((result: any) => {
            // שמירת נתונים בזיכרון הדפדפן
            sessionStorage.setItem("save_logged_in_email", new_user.user_email);

            // משתמש מחובר
            this.is_logged_service.Set_User_Logged_In(true);

            // ניתוב לדף הבית משתמש נירשם בהצלחה
            alert(`${result.user_email} User registration successfully created! User logged in!`); 
            this.router.navigate(["/home"], {state: {links: true, user_email: new_user.user_email}});
        });
    }
  }
}
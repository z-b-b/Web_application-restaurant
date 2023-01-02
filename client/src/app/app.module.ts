import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './auth.guard.service';
import { ConnectionToServerService } from './connection-to-server.service';
import { IsLoggedService } from './is-logged.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    OrdersComponent,
    PreviousOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard, ConnectionToServerService, IsLoggedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

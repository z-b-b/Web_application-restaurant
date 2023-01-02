import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard.service';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { PreviousOrdersComponent } from './previous-orders/previous-orders.component';

const routes: Routes = [
  {path: ''      , component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'home'  , component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login' , component: LoginComponent},
  {path: 'menu'  , component: MenuComponent  , canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'previous-orders', component: PreviousOrdersComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
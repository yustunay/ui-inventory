import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoComponent } from './todo/todo.component';
import { OrderComponent } from './order/order.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'logout', component:LogoutComponent, canActivate:[RouteGuardService]},
  {path:'welcome/:name', component:WelcomeComponent, canActivate:[RouteGuardService]},
  {path:'todos', component:ListTodosComponent, canActivate:[RouteGuardService]},
  {path:'todos/:id', component:TodoComponent, canActivate:[RouteGuardService]},
  {path:'order', component:OrderComponent, canActivate:[RouteGuardService]},
  {path:'products', component:ListProductsComponent, canActivate:[RouteGuardService]},
  {path:'products/:id', component:ProductComponent, canActivate:[RouteGuardService]},

  {path:'**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

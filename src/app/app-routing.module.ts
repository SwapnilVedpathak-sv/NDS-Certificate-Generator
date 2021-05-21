import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { SidebarComponent } from './sidebar/sidebar.component'

const routes: Routes = [
  { path:'', redirectTo: "login", pathMatch: 'full'},
  { path:'login', component: LoginPageComponent},
  { path:'register', component: RegisterPageComponent},
  { path:'home', component: DashboardComponent},
  // { path:'home', component: SidebarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstrumentDropdownComponent } from './instrument-dropdown/instrument-dropdown.component';
import { ListOfCertificateComponent } from './list-of-certificate/list-of-certificate.component';
import { GenerateCertificateWithInDeComponent } from './generate-certificate-with-in-de/generate-certificate-with-in-de.component';
import { GenerateCertificateComponent } from './generate-certificate/generate-certificate.component';
// import { SidebarComponent } from './sidebar/sidebar.component'

const routes: Routes = [
  { path:'', redirectTo: "login", pathMatch: 'full'},
  { path:'login', component: LoginPageComponent},
  { path:'register', component: RegisterPageComponent},
  { path:'home', component: DashboardComponent},
  { path:'instrument', component: InstrumentDropdownComponent},
  { path:'all-certificate', component: ListOfCertificateComponent},
  { path:'in-de-certificate', component: GenerateCertificateWithInDeComponent},
  { path:'generate-certificate', component: GenerateCertificateComponent},
  // { path:'home', component: SidebarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

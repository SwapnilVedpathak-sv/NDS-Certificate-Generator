import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Component
import { AppComponent } from './app.component';
import { InstrumentDropdownComponent } from './instrument-dropdown/instrument-dropdown.component';
import { ListOfCertificateComponent } from './list-of-certificate/list-of-certificate.component';
import { GenerateCertificateComponent } from './generate-certificate/generate-certificate.component';
import { GenerateCertificateWithInDeComponent } from './generate-certificate-with-in-de/generate-certificate-with-in-de.component';

// Service
import { RootService } from './root.service';

// Angular Material Imports
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UpdateCertificateComponent } from './update-certificate/update-certificate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DashboardComponent,
    InstrumentDropdownComponent,
    ListOfCertificateComponent,
    GenerateCertificateComponent,
    GenerateCertificateWithInDeComponent,
    SidebarComponent,
    UpdateCertificateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material Imports
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatRadioModule,
    MatTooltipModule,
    MatTableModule,
    MatSelectModule,
    MatGridListModule,
    MatPaginatorModule,
    MatChipsModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatListModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [RootService],
  bootstrap: [AppComponent],
})
export class AppModule {}

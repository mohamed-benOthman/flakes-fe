import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule, Routes} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {SigninComponent} from './auth/signin/signin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArtistProfileComponent} from './artist-profile/artist-profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ButtonModule} from 'primeng/button';

import {TruncatePipe} from './pipes/truncate.pipe';
import {StringToNumberPipe} from './pipes/stringToNumber.pipe';
import { ProfileInfoComponent } from './artist-profile/display/profile-info/profile-info.component';
import { ProfileEditInfoComponent } from './artist-profile/edit/profile-edit-info/profile-edit-info.component';
import { ProfileEditPhotosComponent } from './artist-profile/edit/profile-edit-photos/profile-edit-photos.component';
import { ProfilePhotosGalleryComponent } from './artist-profile/display/profile-photos-gallery/profile-photos-gallery.component';
import { SearchComponent } from './search/search.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectCitiesComponent } from './utils/select-cities/select-cities.component';
import { ArtistProfileEditComponent } from './artist-profile/edit/artist-profile-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactComponent } from './submenus/contact/contact.component';
import { PartnershipComponent } from './submenus/partnership/partnership.component';
import { AboutComponent } from './submenus/about/about.component';
import { NgxSmoothDnDModule } from 'ngx-smooth-dnd';
import { UserCharterComponent } from './submenus/user-charter/usercharter.component';
import { FaqComponent } from './submenus/faq/faq.component';
import { CgvComponent } from './submenus/cgv/cgv.component';
import { ConfidentialityComponent } from './submenus/confidentiality/confidentiality.component';
import { LegalsComponent } from './submenus/legals/legals.component';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { JwtInterceptor } from './utils/helpers/jwt.interceptor';
import { ErrorInterceptor } from './utils/helpers/error.interceptor';
import { AuthGuard } from './utils/helpers/auth.guard';
import { LoggedInComponent } from './auth/logged-in/logged-in.component';
import {NgxPayPalModule} from 'ngx-paypal';
import {NgxGalleryModule} from 'ngx-gallery-9';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {
  BlockUIModule,
  CardModule,
  DialogModule, DropdownModule, FileUploadModule,
  MultiSelectModule, ProgressSpinnerModule,
  ScrollPanelModule,
  SplitButtonModule,
  TabViewModule,
  ToastModule
} from 'primeng';
import {MatPaginatorIntlCro} from './utils/intl/MatPaginatorIntlCro';






const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ArtistProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile-details/:username', component: ArtistProfileComponent },
  { path: 'profile/edit', component: ArtistProfileEditComponent, canActivate: [AuthGuard]},
  { path: 'search-makeup', component: SearchComponent },
  { path: 'search-microblading', component: SearchComponent },
  { path: 'search-manicure', component: SearchComponent },
  { path: 'search-eyelashes', component: SearchComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'usercharter', component: UserCharterComponent },
  { path: 'partnership', component: PartnershipComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'cgv', component: CgvComponent },
  { path: 'privacy', component: ConfidentialityComponent },
  { path: 'disclaimer', component: LegalsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    ArtistProfileComponent,
    TruncatePipe, StringToNumberPipe,
    ProfileInfoComponent,
    ProfileEditInfoComponent,
    ProfileEditPhotosComponent,
    ProfilePhotosGalleryComponent,
    SearchComponent,
    SelectCitiesComponent,
    ArtistProfileEditComponent,
    SignupComponent,
    ContactComponent,
    PartnershipComponent,
    AboutComponent,
    UserCharterComponent,
    FaqComponent,
    CgvComponent,
    ConfidentialityComponent,
    LegalsComponent,
    LoggedInComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, NgxGalleryModule,
    ButtonModule, DialogModule, NgxSmoothDnDModule, ScrollPanelModule, SplitButtonModule,
    MatInputModule, MultiSelectModule, MatCheckboxModule, ToastModule, CardModule, BlockUIModule,
    MatGridListModule, TabViewModule, FileUploadModule, DropdownModule, ProgressSpinnerModule,
    NgSelectModule, MatPaginatorModule, MatStepperModule, MatIconModule, MatCheckboxModule,
    RouterModule.forRoot(appRoutes),
    MatRadioModule, NgxPayPalModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

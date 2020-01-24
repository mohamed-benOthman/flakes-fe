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
import {NgxGalleryModule} from 'ngx-gallery';
import {ButtonModule} from 'primeng/button';
import {
  BlockUIModule,
  CardModule,
  DialogModule,
  DropdownModule,
  FileUploadModule,
  GrowlModule,
  MultiSelectModule,
  ProgressSpinnerModule, ScrollPanelModule, SplitButtonModule,
  TabViewModule
} from 'primeng/primeng';
import {MatCheckboxModule, MatGridListModule, MatIconModule, MatInputModule, MatPaginatorModule, MatStepperModule} from '@angular/material';
import {TruncatePipe} from './pipes/truncate.pipe';
import {StringToNumberPipe} from './pipes/stringToNumber.pipe';
import { ProfileInfoComponent } from './artist-profile/display/profile-info/profile-info.component';
import { ProfileEditInfoComponent } from './artist-profile/edit/profile-edit-info/profile-edit-info.component';
import { ProfileEditPhotosComponent } from './artist-profile/edit/profile-edit-photos/profile-edit-photos.component';
import { ProfilePhotosGalleryComponent } from './artist-profile/display/profile-photos-gallery/profile-photos-gallery.component';
import { SearchComponent } from './search/search.component';
import {HttpClientModule} from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectCitiesComponent } from './utils/select-cities/select-cities.component';
import { ArtistProfileEditComponent } from './artist-profile/edit/artist-profile-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactComponent } from './submenus/contact/contact.component';
import { PartnershipComponent } from './submenus/partnership/partnership.component';
import { AboutComponent } from './submenus/about/about.component';
import {NgxSmoothDnDModule} from 'ngx-smooth-dnd';
import {UserCharterComponent} from './submenus/user-charter/usercharter.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ArtistProfileComponent },
  { path: 'profile-details/:username', component: ArtistProfileComponent },
  { path: 'profile/edit', component: ArtistProfileEditComponent },
  { path: 'search-makeup', component: SearchComponent },
  { path: 'search-microblading', component: SearchComponent },
  { path: 'search-manicure', component: SearchComponent },
  { path: 'search-eyelashes', component: SearchComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'usercharter', component: UserCharterComponent },
  { path: 'partnership', component: PartnershipComponent },
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
    UserCharterComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, NgxGalleryModule,
    ButtonModule, DialogModule, NgxSmoothDnDModule, ScrollPanelModule, SplitButtonModule,
    MatInputModule, MultiSelectModule, MatCheckboxModule, GrowlModule, CardModule, BlockUIModule,
    MatGridListModule, TabViewModule, FileUploadModule, DropdownModule, ProgressSpinnerModule,
    NgSelectModule, MatPaginatorModule, MatStepperModule, MatIconModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

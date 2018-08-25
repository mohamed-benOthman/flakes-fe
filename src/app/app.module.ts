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
import {DialogModule, FileUploadModule, GrowlModule, MultiSelectModule, TabViewModule} from 'primeng/primeng';
import {MatCheckboxModule, MatGridListModule, MatInputModule} from '@angular/material';
import {TruncatePipe} from './pipes/truncate.pipe';
import { ProfileInfoComponent } from './artist-profile/profile-info/profile-info.component';
import { ProfileEditComponent } from './artist-profile/profile-edit/profile-edit.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ArtistProfileComponent },
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
    TruncatePipe,
    ProfileInfoComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, NgxGalleryModule,
    ButtonModule, DialogModule,
    MatInputModule, MultiSelectModule, MatCheckboxModule, GrowlModule,
    MatGridListModule, TabViewModule, FileUploadModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

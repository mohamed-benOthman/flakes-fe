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
import {DialogModule, GrowlModule, MultiSelectModule} from 'primeng/primeng';
import {MatCheckboxModule, MatGridListModule, MatInputModule} from '@angular/material';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, NgxGalleryModule,
    ButtonModule, DialogModule,
    MatInputModule, MultiSelectModule, MatCheckboxModule, GrowlModule,
    MatGridListModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

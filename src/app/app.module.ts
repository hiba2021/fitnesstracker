import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthModule } from './auth/auth.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import {AngularFireModule} from 'angularfire2'
import { environment } from 'src/environments/environment';

import { MaterialModule } from './material.module';

import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';


import { AuthService } from './auth/auth-service';
import { Trainingservice } from './training/training.service';
import { UIService } from './shared/ui.service';
import { StoreModule } from '@ngrx/store';
import { reducers} from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    MaterialModule,
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),//does the firestore setup
    AngularFirestoreModule, // to enable firestore related functionalities
    StoreModule.forRoot(reducers)
  ],
 
  providers: [AuthService,Trainingservice,UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }

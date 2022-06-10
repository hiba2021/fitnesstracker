import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from 'angularfire2/auth';


 // NgModule() turns this file into a module file
@NgModule({
    declarations:[
        SignupComponent,
        LoginComponent
    ],
    imports:[
        SharedModule,
        AngularFireAuthModule,
        AuthRoutingModule
    ],
    exports:[
        
    ]
})   
export class AuthModule{}

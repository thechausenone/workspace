import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AccountComponent } from './components/account/account.component';

export const firebaseConfig = {
  apiKey: "AIzaSyBartH5-zyYvpHn3YzdmYNz7H6GuEAgfYM",
  authDomain: "workspace-99bc9.firebaseapp.com",
  databaseURL: "https://workspace-99bc9.firebaseio.com",
  projectId: "workspace-99bc9",
  storageBucket: "workspace-99bc9.appspot.com",
  messagingSenderId: "380448550722"
};

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    AccountComponent
  ],
  providers: [
    
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }

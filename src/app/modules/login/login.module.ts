import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AccountComponent } from './components/account/account.component';
import { DatabaseService } from '../../providers/database.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    AngularFireAuthModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    AccountComponent
  ],
  providers: [
    DatabaseService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }

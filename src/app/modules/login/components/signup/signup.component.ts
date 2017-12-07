import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../providers/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{
  email: string;
  password: string;

  constructor(private _authService: AuthenticationService) {
    this.email = "";
    this.password = "";
   }

  SignupWithEmailAndPassword():void{
    this._authService.SignupWithEmailAndPassword(this.email, this.password);
  }
}

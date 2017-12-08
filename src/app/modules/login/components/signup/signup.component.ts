import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../providers/authentication.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{
  email: string;
  password: string;
  router: Router;
  popupMessage: MatSnackBar;

  constructor(private _authService: AuthenticationService,
              router: Router,
              popupMessage: MatSnackBar) {
    this.email = "";
    this.password = "";
    this.router = router;
    this.popupMessage = popupMessage;
   }

  SignupWithEmailAndPassword():void{
    var signupResult;
    
    this._authService.SignupWithEmailAndPassword(this.email, this.password) .then((data) => {
      signupResult = data; 
      if (signupResult){
        this.HandleSignupSuccess();
      }
      else{
        this.HandleSignupFailure();
      }
    });
  }

  private HandleSignupSuccess():void{
    var popupRef = this.popupMessage.open("Sign up successful! Please sign in now.", null, {
      duration:1500
    });

    popupRef.afterDismissed().subscribe(() => {
      this.router.navigateByUrl("/login");
    });
  }

  private HandleSignupFailure():void{
    this.popupMessage.open("Please try again.", null, {
      duration: 1500
    });
  }
}

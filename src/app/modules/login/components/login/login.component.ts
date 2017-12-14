import { Component } from '@angular/core';
import { MatFormFieldModule, MatButtonModule, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../providers/authentication.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { DatabaseService } from '../../../../providers/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{
  email: string;
  password: string;
  router: Router;
  popupMessage: MatSnackBar;

  constructor(iconRegistry: MatIconRegistry, 
              sanitizer: DomSanitizer, 
              private _authService: AuthenticationService,
              router: Router,
              popupMessage: MatSnackBar,
              private _databaseService: DatabaseService) {
    iconRegistry.addSvgIcon(
      'github-circle',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github-circle.svg')
    );
    
    this.email = "";
    this.password = "";
    this.router = router;
    this.popupMessage = popupMessage;
  }

  LoginWithEmailAndPassword():void{
    var loginResult;
    
    this._authService.LoginWithEmailAndPassword(this.email, this.password).then((data) => {
      loginResult = data; 
      if (loginResult){
        this.HandleLoginSuccess();
      }
      else{
        this.HandleLoginFailure();
      }
    });
  }

  private HandleLoginSuccess():void{
    var popupRef = this.popupMessage.open("Welcome back to Workspace!", null, {
      duration: 1500
    });

    popupRef.afterDismissed().subscribe(() => {
      this._databaseService.ReadBoardsFromDatabase().subscribe(data => {
        this.router.navigateByUrl("/account");
      });
    });
  }

  private HandleLoginFailure():void{
    this.popupMessage.open("Please try again.", null, {
      duration: 1500
    });
  }
}

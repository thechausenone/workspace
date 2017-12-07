import { Component } from '@angular/core';
import { MatFormFieldModule, MatButtonModule, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../providers/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  email: string;
  password: string;

  constructor(iconRegistry: MatIconRegistry, 
              sanitizer: DomSanitizer, 
              private _authService: AuthenticationService) {
    iconRegistry.addSvgIcon(
      'github-circle',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github-circle.svg')
    );
    
    this.email = "";
    this.password = "";
  }

  LoginWithEmailAndPassword():void{
    this._authService.LoginWithEmailAndPassword(this.email, this.password);
  }

}

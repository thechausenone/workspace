import { Component } from '@angular/core';
import { AuthenticationService } from '../../providers/authentication.service';
import { StateManagerService} from '../../../../providers/state-manager.service';
import { UserInfo } from '../../providers/objects/userInfo.object';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  userInfo: UserInfo;
  email: string;
  provider: string;
  router: Router;
  popupMessage: MatSnackBar;

  constructor(private _authService: AuthenticationService,
              private _stateManagerService: StateManagerService,
              router: Router,
              popupMessage: MatSnackBar) {
    this.userInfo = _stateManagerService.GetUserInfo();
    this.email = this.userInfo.email;
    this.provider = this.userInfo.provider;
    this.router = router;
    this.popupMessage = popupMessage;
  }

  Logout(): void {
    let logoutResult;
    
    this._authService.Logout().then((data) => {
      logoutResult = data; 
      if (logoutResult) {
        this.HandleLogoutSuccess();
      }else {
        this.HandleLogoutFailure();
      }
    });
  }

  private HandleLogoutSuccess(): void {
    const popupRef = this.popupMessage.open('You have successfully signed out.', null, {
      duration: 1500
    });

    popupRef.afterDismissed().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

  private HandleLogoutFailure(): void {
    this.popupMessage.open('Please try again.', null, {
      duration: 1500
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../providers/authentication.service';
import { UserInfo } from '../../providers/objects/userInfo.object';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  userInfo: UserInfo;
  email: string;
  provider: string;

  constructor(private authService: AuthenticationService) {
    this.userInfo = authService.GetUserInfo();
    this.email = this.userInfo.email;
    this.provider = this.userInfo.provider;
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { TileObject } from './objects/tile.object';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../modules/login/providers/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  router: Router;
  tiles:Array<TileObject>;

  constructor(router: Router,
              private authService: AuthenticationService) {
    this.router = router;
    this.tiles = [
      {text: "Account", image: "account_circle", link: "login"},
      {text: "Settings", image: "settings", link: ""},
      {text: "About", image: "help", link: ""},
      {text: "Tutorial", image: "ondemand_video", link: ""}
    ];
    this.handleUserLoggedIn();
  }

  ngOnInit() {}

  private handleUserLoggedIn(): void{
    var index = this.tiles.findIndex(x => x.text == "Account");

    if (this.authService.GetUserInfo().CheckUserStatus()){
      this.tiles[index].text = "Account";
      this.tiles[index].image = "account_circle";
      this.tiles[index].link = "account";
    }
    else{
      this.tiles[index].text = "Sign In";
      this.tiles[index].image = "input";
      this.tiles[index].link = "login";
    }
  }

  navigateTo(tile: TileObject){
    this.router.navigateByUrl("/" + tile.link);
  }
}

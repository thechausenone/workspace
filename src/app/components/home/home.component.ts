import { Component, OnInit } from '@angular/core';
import { TileObject } from './objects/tile.object';
import { Router } from "@angular/router";
import { StateManagerService } from "../../providers/state-manager.service";
import { ElectronService } from "../../providers/electron.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  router: Router;
  tiles:Array<TileObject>;

  constructor(router: Router,
              private stateManagerService: StateManagerService,
              private electronService: ElectronService) {
    this.router = router;
    this.tiles = [
      {text: "Account", image: "account_circle", link: "/login"},
      {text: "Settings", image: "settings", link: "/settings"},
      {text: "About", image: "info", link: "https://github.com/thechausenone/workspace/wiki"},
      {text: "Report a bug", image: "bug_report", link: "https://github.com/thechausenone/workspace/issues"}
    ];
    this.handleUserLoggedIn();
  }

  ngOnInit() {}

  private handleUserLoggedIn(): void{
    var index = this.tiles.findIndex(x => x.text == "Account");

    if (this.stateManagerService.GetUserInfo().CheckUserStatus()){
      this.tiles[index].text = "Account";
      this.tiles[index].image = "account_circle";
      this.tiles[index].link = "/account";
    }
    else{
      this.tiles[index].text = "Sign In";
      this.tiles[index].image = "input";
      this.tiles[index].link = "/login";
    }
  }

  navigateTo(tile: TileObject){
    if (tile.link.startsWith("http"))
    {
      this.electronService.openLink(tile.link);
    }
    else{
      this.router.navigateByUrl(tile.link);
    }
  }
}

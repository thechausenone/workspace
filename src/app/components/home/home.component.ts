import { Component, OnInit } from '@angular/core';
import { TileObject } from './objects/tile.object';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  router: Router;
  tiles:Array<TileObject>;

  constructor(router: Router) {
    this.router = router;
    this.tiles = [
      {text: "Account", image: "account_circle", link: "login"},
      {text: "Settings", image: "settings", link: ""},
      {text: "About", image: "help", link: ""},
      {text: "Tutorial", image: "ondemand_video", link: ""}
    ];
  }

  ngOnInit() {}

  navigateTo(tile: TileObject){
    this.router.navigateByUrl("/" + tile.link);
  }
}

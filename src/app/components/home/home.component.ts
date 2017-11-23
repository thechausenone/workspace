import { Component, OnInit } from '@angular/core';
import { TileObject } from './objects/tile.object';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tiles:Array<TileObject>;

  constructor() {
    this.tiles = [
      {text: "Account", image: "account_circle"},
      {text: "Settings", image: "settings"},
      {text: "About", image: "help"},
      {text: "Tutorial", image: "ondemand_video"}
    ]
  }

  ngOnInit() {
  }

}

import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {Board} from './objects/board.object'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  showHide = false;
  boards: Array<Board>;

  constructor() {
    this.boards = new Array<Board>();
   }

  expandTaskBar(){
    this.showHide = !this.showHide;
  }

  addNewBoard(){
    this.boards.push(new Board());
    console.log(this.boards);
  }
}

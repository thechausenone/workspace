import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {Board} from './objects/board.object'
import {DataService} from '../../providers/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
   boards: Array<Board>;

  constructor(private _dataService: DataService) {
    this.getBoards();
  }

  setActiveBoard(board:Board){
    this._dataService.setActiveBoard(board);
  }

  private getBoards(){
    this._dataService.getBoards()
                      .subscribe(
                          boards => {
                              this.boards = boards
                          }
                      );
  }

  addBoard(){
    //replace these with dynamic title/icon
    var title = "test123";
    var icon = "web";
    this._dataService.addBoard(title, icon);
    this._dataService.getBoards();
  }

  deleteBoard(){
    //replace these with dynamic board name
    var boardName = "the first board";
    this._dataService.deleteBoard(boardName);
    this._dataService.getBoards();

  }
}

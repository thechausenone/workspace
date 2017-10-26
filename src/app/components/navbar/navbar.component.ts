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
  showHide = false;
  boards: Array<Board>;

  constructor(private _dataService: DataService) {
    this.boards = new Array<Board>();
   }

  expandTaskBar(){
    this.showHide = !this.showHide;
  }

  addNewBoard(){
    this._dataService.getBoards()
                     .subscribe(
                        boards => {this.boards = boards, console.log(this.boards)},
                        error => console.log("Boards were unsuccessfully retrieved from the DataService")
                     );
   
  }
}

import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material';
import {NgIf} from '@angular/common';
import {Board} from './objects/board.object'
import {DataService} from '../../providers/data.service';
import {BoardCreationComponent} from '../board-creation/board-creation.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
   showHide = false;
   dialogRef: MatDialogRef<BoardCreationComponent>;
   boards: Array<Board>;

  constructor(private _dataService: DataService, public dialog: MatDialog) {
    console.log("constructor for navbar called");
    this.getBoards();
  }

  expandTaskBar(){
    this.showHide = !this.showHide;
  }

  private getBoards(){
    this._dataService.getBoards()
                      .subscribe(
                          boards => {
                              this.boards = boards,
                              console.log(this.boards)
                          }
                      );
  }

  addBoard(){
    //replace these with dynamic title/icon
    var title = "test123";
    var icon = "web";

    this.dialogRef = this.dialog.open(BoardCreationComponent, {
      height: '400px',
      width: '600px',   
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //title = result;
    });

    this._dataService.addBoard(title, icon);
    this._dataService.getBoards();
  }

  //note: we will want a dynamic title passed into only one delete call here, followed by a call to getBoards
  deleteBoard(){
    //will successfully delete (demo)
    this._dataService.deleteBoard("the first board");
    
    //will send an error as there is no board by the name "rando" (demo)
    this._dataService.deleteBoard("rando"); 
    this._dataService.getBoards();
  }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Board } from "../components/navbar/objects/board.object";
import { Window } from "../components/grid/objects/window.object";

@Injectable()
export class StateManagerService {
  private _activeBoardIndex: number;
  private _boards: Array<Board>;

  private _activeWindowsSource: BehaviorSubject<Array<Window>>;
  public activeWindows$: Observable<Array<Window>>;
  private _activeBoardSource: BehaviorSubject<Board>;
  public _activeBoard$: Observable<Board>;
  
  constructor() {
    this._activeBoardIndex = -1;
    this._boards = new Array<Board>();

    this._activeWindowsSource = new BehaviorSubject<Array<Window>>(this.getActiveWindow());
    this.activeWindows$ = this._activeWindowsSource.asObservable();
    this._activeBoardSource = new BehaviorSubject<Board>(this.getActiveBoard());
    this._activeBoard$ = this._activeBoardSource.asObservable();
  }

  public GetBoards(): Array<Board>{
    return this._boards;
  }

  public SetBoards(boards: Array<Board>): void{
    this._boards = boards;
  }

  public addBoard(title:string, icon:string):void{
    this._boards.push(new Board(title, icon));
    //this._electronService.writeToJSON(this._filePath, JSON.stringify(this._boards));
  }

  public deleteBoard(title:string):void{
    var index = this._boards.findIndex(board => board.title === title);

    if (index!== -1){
        this._boards.splice(index, 1);
        //this._electronService.writeToJSON(this._filePath, JSON.stringify(this._boards));
        console.log("The board titled \"" + title + "\" has been deleted.");
    }
    else{
        console.error("Could not find a board titled \"" + title + "\".");
    }
}

  public addWindow(name:string, file:string):void{
    this._boards[this._activeBoardIndex].windows.push(new Window(name, file));
  }

  public GetActiveBoardIndex(): number{
    return this._activeBoardIndex;
  }

  public SetActiveBoardIndex(index: number): void{
    this._activeBoardIndex = index;
  }

  public getActiveBoard(): Board{
    return this._boards[this._activeBoardIndex];
  }

  public setActiveBoard(board:Board): void{
    this._activeBoardIndex = this._boards.findIndex(x => x == board);
    this._activeWindowsSource.next(this.getActiveWindow());
    this._activeBoardSource.next(this.getActiveBoard());
}

  private getActiveWindow():Array<Window>{
    if (this._boards.length == 0){
        return new Array<Window>();
    }
    else{
        return this._boards[this._activeBoardIndex].windows;
    }
  }

  public checkIfActiveBoard(board:Board):boolean{
      return this._boards.findIndex(x => x == board) === this._activeBoardIndex;
  }
}

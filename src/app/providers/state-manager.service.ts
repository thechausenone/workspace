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
  private _activeWindows$: Observable<Array<Window>>;
  
  constructor() {
    this._activeBoardIndex = -1;
    this._boards = new Array<Board>();
    this._activeWindowsSource = new BehaviorSubject<Array<Window>>(this.GetActiveWindows());
    this._activeWindows$ = this._activeWindowsSource.asObservable();
  }

  //#region board methods

  public GetBoards(): Array<Board>{
    return this._boards;
  }

  public SetBoards(boards: Array<Board>): void{
    this._boards = boards;
  }

  public AddBoard(title:string, icon:string):void{
    this._boards.push(new Board(title, icon));
  }

  public DeleteBoard(title:string):void{
    var index = this._boards.findIndex(board => board.title === title);

    if (index!== -1){
        this._boards.splice(index, 1);
        console.log("The board titled \"" + title + "\" has been deleted.");
    }
    else{
        console.error("Could not find a board titled \"" + title + "\".");
    }
  }

  public GetActiveBoardIndex(): number{
    return this._activeBoardIndex;
  }

  public SetActiveBoardIndex(index: number): void{
    this._activeBoardIndex = index;
    this._activeWindowsSource.next(this.GetActiveWindows());
  }

  //#endregion

  //#region window methods

  public AddWindow(name:string, file:string):void{
    this._boards[this._activeBoardIndex].windows.push(new Window(name, file));
  }

  public GetWindowsObservable(): Observable<Array<Window>>{
    return this._activeWindows$;
  }

  //#endregion
  
  //#region private methods

  private GetActiveBoard(): Board{
    return this._boards[this._activeBoardIndex];
  }

  private GetActiveWindows():Array<Window>{
    if (this._boards.length == 0){
        return new Array<Window>();
    }
    else{
        return this._boards[this._activeBoardIndex].windows;
    }
  }

  //#endregion
}

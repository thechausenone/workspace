import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Board } from "../components/navbar/objects/board.object";
import { Window } from "../components/grid/objects/window.object";
import { UserInfo } from "../modules/login/providers/objects/userInfo.object";

@Injectable()
export class StateManagerService {
  private _activeBoardIndex: number;
  private _boards: Array<Board>;
  private _activeWindowsSource: BehaviorSubject<Array<Window>>;
  private _activeWindows$: Observable<Array<Window>>;
  private userInfo: UserInfo;
  
  constructor() {
    this._activeBoardIndex = -1;
    this._boards = new Array<Board>();
    this._activeWindowsSource = new BehaviorSubject<Array<Window>>(this.GetActiveWindows());
    this._activeWindows$ = this._activeWindowsSource.asObservable();
    this.userInfo = new UserInfo();
    console.log("StateManagerService has been initialized");
  }

  //#region USERINFO METHODS

  public GetUserInfo():UserInfo{
    return this.userInfo;
  }

  public SetUserInfo(user: any):void{
    if (user == null){
      this.userInfo.ClearAllProperties();
    }
    else{
        this.userInfo.SetAllProperties(user.uid, 
                                        user.getIdToken,
                                        user.email,
                                        user.providerId);
    };
  }

  //#endregion

  //#region BOARD METHODS

  public GetBoards(): Array<Board>{
    return this._boards;
  }

  public SetBoards(boards: Array<Board>): void{
    this._boards = boards;
  }

  public AddBoard(title:string, icon:string):void{
    this._boards.push(new Board(title, icon));
  }

  public DeleteBoard(board:Board):void{
    var index = this._boards.findIndex(currBoard => currBoard === board);

    if (index!== -1){
        this._boards.splice(index, 1);
        console.log("The board titled \"" + board.title + "\" has been deleted.");
    }
    else{
        console.error("Could not find a board titled \"" + board.title + "\".");
    }
  }

  public GetActiveBoardIndex(): number{
    return this._activeBoardIndex;
  }

  public SetActiveBoardIndex(index: number): void{
    this._activeBoardIndex = index;
    
    if (index == -1){
      this._activeWindowsSource.next(new Array<Window>());
    }
    else{
      this._activeWindowsSource.next(this.GetActiveWindows());
    }
  }

  //#endregion

  //#region WINDOW METHODS

  public AddWindow(name:string, file:string):void{
    this._boards[this._activeBoardIndex].windows.push(new Window(name, file));
  }

  public GetWindowsObservable(): Observable<Array<Window>>{
    return this._activeWindows$;
  }

  //#endregion
  
  //#region PRIVATE METHODS

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

import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { Window } from "../components/grid/objects/window.object";
import { Board } from "../components/navbar/objects/board.object";
import { HttpClient } from "@angular/common/http";
import { ElectronService } from "./electron.service";

@Injectable()
export class DataService {
    private _filePath: string;
    private _boards: Array<Board>;
    private _activeBoardIndex: number;
    private _activeWindowsSource: BehaviorSubject<Array<Window>>;
    public activeWindows$: Observable<Array<Window>>;

    constructor(private _http: HttpClient, private _electronService: ElectronService) {
        this._filePath = './mock-data/boards.data.json';
        this._boards = new Array<Board>();
        this._activeBoardIndex = -1;
        this._activeWindowsSource = new BehaviorSubject<Array<Window>>(this.getActiveWindow());
        this.activeWindows$ = this._activeWindowsSource.asObservable();
    }

    public checkIfActiveBoard(board:Board):boolean{
        return this._boards.findIndex(x => x == board) === this._activeBoardIndex;
    }

    public setActiveBoard(board:Board): void{
        this._activeBoardIndex = this._boards.findIndex(x => x == board);
        this._activeWindowsSource.next(this.getActiveWindow());
    }

    public getBoards(): Observable<Array<Board>>{
        return this._http.get<Array<Board>>(this._filePath)
                         .do(data => {
                             this._boards = data as Array<Board>;
                             this._activeBoardIndex = 0;
                            })
                         .catch(this.handleNotFound);
    }

    public addBoard(title:string, icon:string):void{
        this._boards.push(new Board(title, icon));
        this._electronService.writeToJSON(this._filePath, JSON.stringify(this._boards));
    }

    public deleteBoard(title:string):void{
        var index = this._boards.findIndex(board => board.title === title);

        if (index!== -1){
            this._boards.splice(index, 1);
            this._electronService.writeToJSON(this._filePath, JSON.stringify(this._boards));
            console.log("The board titled \"" + title + "\" has been deleted.");
        }
        else{
            console.error("Could not find a board titled \"" + title + "\".");
        }
    }

    //#region private methods

    private handleNotFound (error: any){
        console.error(error.message);
        return Observable.of([]);
    }

    private getActiveWindow():Array<Window>{
        if (this._boards.length == 0){
            return new Array<Window>();
        }
        else{
            return this._boards[this._activeBoardIndex].windows;
        }
    }
    //#endregion
}

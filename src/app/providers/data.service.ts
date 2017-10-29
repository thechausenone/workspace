import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { Window } from "../components/grid/objects/window.object";
import { Board } from "../components/navbar/objects/board.object";
import { HttpClient } from "@angular/common/http";
import {ElectronService} from "./electron.service";

@Injectable()
export class DataService {
    private _filePath = './mock-data/boards.data.json';
    private _boards = new Array<Board>();//local instance of boards to be used by add/delete

    constructor(private _http: HttpClient, private _electronService: ElectronService) {}

    public getBoards(): Observable<Array<Board>>{
        return this._http.get<Array<Board>>(this._filePath)
                         .do(data => {
                             this._boards = data as Array<Board>;
                             console.log("Data retrieved from JSON")
                            })
                         .catch(this.handleNotFound);
    }

    private handleNotFound (error: any){
        console.error(error.message);
        return Observable.of([]);
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
}

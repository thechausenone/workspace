import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { Board } from "../components/navbar/objects/board.object";
import { HttpClient } from "@angular/common/http";
import { ElectronService } from "./electron.service";
import { StateManagerService } from "./state-manager.service";

@Injectable()
export class DatabaseService {
    private _filePath: string;

    constructor(private _http: HttpClient, 
                private _electronService: ElectronService,
                private _stateService: StateManagerService) {
        this._filePath = './mock-data/boards.data.json';
    }

    private ReadBoardsFromDatabase(): Observable<Array<Board>>{
        return this._http.get<Array<Board>>(this._filePath)
                         .do(data => {
                                var boards = data as Array<Board>;
                                this._stateService.SetBoards(boards);
                                if (boards.length == 0){
                                this._stateService.SetActiveBoardIndex(0);
                                }
                            })
                         .catch(this.handleNotFound);
    }

    //#region private methods

    private handleNotFound (error: any){
        console.error(error.message);
        return Observable.of([]);
    }
    
    //#endregion
}

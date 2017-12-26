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
                private stateService: StateManagerService) {
        this._filePath = './mock-data/boards.data.json';
    }

    //todo: change this return type to boolean if possible
    public ReadBoardsFromDatabase(): Observable<Array<Board>> {
    return this._http.get<Array<Board>>(this._filePath).do(data => {
        this.HandleResponse(data as Array<Board>);
      }).catch((error:any) => {
          this.HandleError(error);
          return Observable.of([]);
      });
    }

    public SaveBoardsToDatabase(boards: Array<Board>): void{
      this._electronService.writeToJSON(this._filePath, JSON.stringify(boards));
    }

    //#region private methods

    private HandleResponse(boards: Array<Board>){
      this.stateService.SetBoards(boards);

      if (boards.length > 0){
        this.stateService.SetActiveBoardIndex(0);
      }
    }

    private HandleError (error: any){
      console.error(error.message);
    }
    
    //#endregion
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { Board } from "../components/navbar/objects/board.object";
import { HttpClient } from "@angular/common/http";
import { ElectronService } from "./electron.service";
import { StateManagerService } from "./state-manager.service";
import { AngularFireDatabase, AngularFireList  } from "angularfire2/database";
import { UserData } from "./objects/user-data.object";

@Injectable()
export class DatabaseService {
    private _filePath: string;

    constructor(private _http: HttpClient, 
                private _electronService: ElectronService,
                private stateManagerService: StateManagerService,
                private afDatabase: AngularFireDatabase) {
        this._filePath = './mock-data/boards.data.json';
        console.log("database service initialized");
    }

    public ReadBoardsFromDatabase(): Observable<Array<Board>> {
      var userId = this.stateManagerService.GetUserInfo().uid;
      if (userId == "undefined" || userId == "")
      {
        console.log("To access boards, user must be logged in");
        return new Observable();
      }
      
      return this.afDatabase.list<Board>('/boards', ref => ref.orderByKey().equalTo("1"))
                            .valueChanges()
                            .do(data => this.HandleResponse(data));
    }

    public SaveBoardsToDatabase(boards: Array<Board>): void{
      this._electronService.writeToJSON(this._filePath, JSON.stringify(boards));
    }

    //#region private methods

    private HandleResponse(boards: Array<Board>){
      this.stateManagerService.SetBoards(boards);

      if (boards.length > 0){
        this.stateManagerService.SetActiveBoardIndex(0);
      }
    }

    private HandleError (error: any){
      console.error(error.message);
    }
    
    //#endregion
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Board } from "../components/navbar/objects/board.object";
import { HttpClient } from "@angular/common/http";
import { StateManagerService } from "./state-manager.service";
import { AngularFireDatabase, AngularFireList  } from "angularfire2/database";
import { UserData } from "./objects/user-data.object";

@Injectable()
export class DatabaseService {
    private _filePath: string;

    constructor(private _http: HttpClient, 
                private stateManagerService: StateManagerService,
                private afDatabase: AngularFireDatabase) {
        console.log("DatabaseService has been initialized");
    }

    public SaveUserToDatabase(user: any): void{
      var data = {
          boards: new Array<Board>(new Board())
      };

      this.afDatabase.object('users').update({ [user.uid]: data });
    }

    public ReadBoardsFromDatabase(): Observable<Array<Board>> {
      var userId = this.stateManagerService.GetUserInfo().uid;

      if (userId == "undefined" || userId == "")
      {
        console.warn("To access boards, user must be logged in");
        return new Observable();
      }
      
      return this.afDatabase.list<Board>('users/' + userId + '/boards')
                            .valueChanges()
                            .do(data => this.HandleResponse(data));
    }

    public SaveBoardsToDatabase(boards: Array<Board>): void{
      var userId = this.stateManagerService.GetUserInfo().uid;

      if (userId == "undefined" || userId == "")
      {
        console.warn("To save boards, user must be logged in");
      }
      else{
        this.afDatabase.object('users/' + userId).set({boards: boards});
      }
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

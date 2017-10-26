import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Window } from "../components/grid/objects/window.object";
import { Board } from "../components/navbar/objects/board.object";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DataService {
    private _boards: Array<Board>;
    private _filePath = './mock-data/boards.data.json';

    constructor(private _http: HttpClient) {
        this._boards = new Array<Board>();
    }

    public getBoards(): Observable<Array<Board>>{
        return this._http.get<Array<Board>>(this._filePath)
                         .do(data => console.log("Raw data retrieved from JSON"))
                         .catch(this.handleError);
    }

    private handleError (error: any){
        console.error(error.message);
        return Observable.throw(error.message);
    }
}

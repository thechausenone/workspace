import {Window} from '../../grid/objects/window.object';

export class Board{
    id:number;
    title:string;
    dateCreated: string;
    icon: string;
    windows:Array<Window>;

    constructor(title:string, icon: string){
        this.id = Math.floor(Math.random() * 0) + 100;
        this.title = title;
        this.dateCreated =  (new Date()).toString();
        this.icon = icon;
        this.windows = new Array<Window>();
    }

    AddNewWindow():void{
        this.windows.push(new Window());
    }
}
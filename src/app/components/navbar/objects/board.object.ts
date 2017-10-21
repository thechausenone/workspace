export class Board{
    title:string;
    dateCreated: string;
    icon: string;

    constructor(){
        this.title = "BOARD TITLE";
        this.dateCreated =  (new Date()).toString();
        this.icon = "Web"
    }
}
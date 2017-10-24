import { GridsterItem }  from 'angular-gridster2';

export class Window implements GridsterItem{
    x?: number;
    y?: number;
    rows?: number;
    cols?: number;
    initCallback?: Function;
    dragEnabled?: boolean;
    resizeEnabled?: boolean;
    maxItemRows?: number;
    minItemRows?: number;
    maxItemCols?: number;
    minItemCols?: number;
    minItemArea?: number;
    maxItemArea?: number;
    [propName: string]: any;
    windowName:string;

    constructor(windowName:string = "default window"){
        this.x = undefined;
        this.y = undefined;
        this.rows = 1;
        this.cols = 1;
        this.dragEnabled = true;
        this.resizeEnabled = true;
        this.windowName = windowName;
    }
}
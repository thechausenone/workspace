import {Window} from '../../grid/objects/window.object';

export class Board {
    id: string;
    title: string;
    dateCreated: string;
    icon: string;
    windows: Array<Window>;

    constructor(title: string = 'default board', icon: string = 'web_asset') {
        this.id = this.GenerateId();
        this.title = title;
        this.dateCreated =  (new Date()).toString();
        this.icon = icon;
        this.windows = new Array<Window>();
        
        // need to add a window here or else problems occur w/ storage in database
        this.AddNewWindow();
    }

    AddNewWindow(): void {
        this.windows.push(new Window());
    }

    private GenerateId(): string {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}

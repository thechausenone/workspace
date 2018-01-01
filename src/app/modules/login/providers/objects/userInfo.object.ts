export class UserInfo {
    uid: string;
    token: any;
    email: string;
    provider: string;
    private loggedIn: boolean;

    constructor() {
        this.uid = 'undefined';
        this.token = 'undefined';
        this.email = 'undefined';
        this.provider = 'undefined';
    }

    CheckUserStatus(): boolean {
        return this.loggedIn;
    }
    ClearAllProperties(): void {
        this.uid = '';
        this.token = '';
        this.email = '';
        this.provider = '';
        this.loggedIn = false;
    }

    SetAllProperties(uid: string, token: any, email: string, provider: string) {
        this.uid = uid;
        this.token = token;
        this.email = email;
        this.provider = provider;
        this.loggedIn = true;
    }
}

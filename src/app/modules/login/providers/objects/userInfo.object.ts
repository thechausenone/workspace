export class UserInfo{
    uid: string;
    token: any;
    email: string;
    provider: string;

    constructor(){
        this.uid = "undefined";
        this.token = "undefined";
        this.email = "undefined";
        this.provider = "undefined";
    }

    ClearAllProperties():void{
        this.uid = "";
        this.token = "";
        this.email = "";
        this.provider = "";
    }

    SetAllProperties(uid:string, token:any, email:string, provider:string){
        this.uid = uid;
        this.token = token;
        this.email = email;
        this.provider = provider;
    }
}
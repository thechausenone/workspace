import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserInfo } from "./objects/userInfo.object";
import { StateManagerService } from "../../../providers/state-manager.service";

@Injectable()
export class AuthenticationService {

    constructor(public afAuth: AngularFireAuth,
                private stateManagerService: StateManagerService){
        console.log("AuthenticationService has been initialized");
    }

    SignupWithEmailAndPassword(email: string, password:string):Promise<boolean>{
        var signupResult;

        return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() =>{
            signupResult = true;

            }).catch((error) => {
                var errorMessage = error.message;
                console.error(errorMessage);
                signupResult = false;

            }).then(() => {
                return signupResult;
            });
    }

    LoginWithEmailAndPassword(email: string, password:string):Promise<boolean>{
        var loginResult;

        return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
                this.UpdateUserInfo();
                loginResult = true;
                
            }).catch((error) => {
                var errorMessage = error.message;
                console.error(errorMessage);
                loginResult =  false;
                
            }).then(() => {
                return loginResult;
            });
    }

    Logout():Promise<boolean>{
        var result;

        return this.afAuth.auth.signOut().then(() => {
                this.UpdateUserInfo();
                result = true;

            }).catch((error) => {
                console.error(error);
                result = false;
            }).then(() => {
                return result;
            });
      }

    private UpdateUserInfo():void{
        this.afAuth.auth.onAuthStateChanged((user) => {
            this.stateManagerService.SetUserInfo(user);
        }); 
    }
}

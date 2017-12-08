import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserInfo } from "./objects/userInfo.object";

@Injectable()
export class AuthenticationService {
    private userInfo: UserInfo;

    constructor(public afAuth: AngularFireAuth){
        this.userInfo = new UserInfo();
        console.log("AuthenticationService has been initialized");
    }

    GetUserInfo():UserInfo{
        return this.userInfo;
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

    Logout():boolean{
        this.afAuth.auth.signOut().then(() => {
            console.log("Sign-out successful");
            this.UpdateUserInfo();

        }).catch((error) => {
            console.error(error);
            return false;
        });

        return true;
      }

    private UpdateUserInfo():void{
        this.afAuth.auth.onAuthStateChanged((user) => {
            if (user == null){
                this.userInfo.ClearAllProperties();
            }
            else{
                this.userInfo.SetAllProperties(user.uid, 
                                                user.getIdToken,
                                                user.email,
                                                user.providerId);
            };
            console.log(this.userInfo);
        }); 
    }
}

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

    SignupWithEmailAndPassword(email: string, password:string):boolean{
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                var errorMessage = error.message;
                console.error(errorMessage);
                return false;
            });
            
        return true;
    }

    LoginWithEmailAndPassword(email: string, password:string):boolean{
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
            console.log("Sign-in successful");
            this.UpdateUserInfo();
            
        }).catch((error) => {
            var errorMessage = error.message;
            console.error(errorMessage);
            return false;
        });

        return true;
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

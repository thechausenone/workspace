import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserInfo } from './objects/userInfo.object';
import { StateManagerService } from '../../../providers/state-manager.service';
import { DatabaseService } from '../../../providers/database.service';

@Injectable()
export class AuthenticationService {

    constructor(public afAuth: AngularFireAuth,
                private stateManagerService: StateManagerService,
                private databaseService: DatabaseService) {
        console.log('AuthenticationService has been initialized');
    }

    SignupWithEmailAndPassword(email: string, password: string): Promise<boolean> {
        let signupResult;

        return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(data => {
            signupResult = true;
            this.databaseService.SaveUserToDatabase(data);
            }).catch((error) => {
                const errorMessage = error.message;
                console.error(errorMessage);
                signupResult = false;

            }).then(() => {
                return signupResult;
            });
    }

    LoginWithEmailAndPassword(email: string, password: string): Promise<boolean> {
        let loginResult;

        return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
                this.UpdateUserInfo();
                loginResult = true;
                
            }).catch((error) => {
                const errorMessage = error.message;
                console.error(errorMessage);
                loginResult =  false;
                
            }).then(() => {
                return loginResult;
            });
    }

    Logout(): Promise<boolean> {
        let result;

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

    private UpdateUserInfo(): void {
        this.afAuth.auth.onAuthStateChanged((user) => {
            this.stateManagerService.SetUserInfo(user);
        }); 
    }
}

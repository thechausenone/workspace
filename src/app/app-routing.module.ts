import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GridComponent } from './components/grid/grid.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './modules/login/components/login/login.component';
import { SignupComponent } from './modules/login/components/signup/signup.component';
import { AccountComponent } from './modules/login/components/account/account.component';
import { SettingsPageComponent } from './modules/settings/components/settings-page/settings-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        component: MainComponent,
        children: [
            { 
                path: '', 
                redirectTo: 'home', 
                pathMatch: 'full' 
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'grid',
                component: GridComponent
            }        
        ],
        data: { state: 'main' }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { state: 'login' }
    },
    {
        path: 'signup',
        component: SignupComponent,
        data: { state: 'signup' }
    },
    {
        path: 'account',
        component: AccountComponent,
        data: { state: 'account' }
    },
    {
        path: 'settings',
        component: SettingsPageComponent,
        data: { state: 'settings' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GridComponent } from './components/grid/grid.component';
import { MainComponent } from "./components/main/main.component";
import { LoginComponent } from "./modules/login/components/login/login.component";

const routes: Routes = [
    {
        path:'',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        component: MainComponent,
        children:[
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
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }

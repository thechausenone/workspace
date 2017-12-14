import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GridsterModule } from 'angular-gridster2';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { LoginModule } from "./modules/login/login.module";
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GridComponent } from './components/grid/grid.component';
import { BoardDialogComponent } from './components/board-dialog/board-dialog.component';
import { WindowDialogComponent } from './components/window-dialog/window-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { ElectronService } from './providers/electron.service';
import { DatabaseService } from './providers/database.service';
import { MainComponent } from './components/main/main.component';
import { TitleLengthPipe } from './pipes/title-length.pipe';
import { MenubarComponent } from './components/menubar/menubar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GridComponent,
    BoardDialogComponent,
    WindowDialogComponent,
    HomeComponent,
    MainComponent,
    TitleLengthPipe,
    MenubarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GridsterModule,
    LoginModule,
    SharedModule,
    SharedModule.forRoot()
  ],
  providers: [
    ElectronService,
    DatabaseService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    BoardDialogComponent, 
    WindowDialogComponent
  ]
})
export class AppModule { }

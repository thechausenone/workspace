import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GridsterModule } from 'angular-gridster2';
import { AppRoutingModule } from './app-routing.module';
import { ElectronService } from './providers/electron.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GridComponent } from './components/grid/grid.component';
import { DataService } from './providers/data.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatToolbarModule, MatTabsModule, MatButtonToggleModule, MatIconModule, MatSidenavModule} from '@angular/material';
import { BoardDialogComponent } from './components/board-dialog/board-dialog.component';
import { WindowDialogComponent } from './components/window-dialog/window-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GridComponent,
    BoardDialogComponent,
    WindowDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    GridsterModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDialogModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSidenavModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ElectronService,
    DataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [BoardDialogComponent, WindowDialogComponent]
})
export class AppModule { }

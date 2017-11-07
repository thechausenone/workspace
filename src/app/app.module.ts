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
<<<<<<< Updated upstream
=======
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatToolbarModule, MatTabsModule, MatButtonToggleModule, MatIconModule} from '@angular/material';
import { BoardDialogComponent } from './components/board-dialog/board-dialog.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GridComponent,
    BoardDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
<<<<<<< Updated upstream
    GridsterModule
=======
    GridsterModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDialogModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatIconModule
>>>>>>> Stashed changes
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ElectronService,
    DataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [BoardDialogComponent]
})
export class AppModule { }

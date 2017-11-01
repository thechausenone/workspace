import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { GridsterModule } from 'angular-gridster2';
import { AppRoutingModule } from './app-routing.module';
import { ElectronService } from './providers/electron.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GridComponent } from './components/grid/grid.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatTabsModule, MatButtonToggleModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    GridsterModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }

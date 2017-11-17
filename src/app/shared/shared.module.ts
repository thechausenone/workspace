import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatToolbarModule, 
        MatTabsModule, MatButtonToggleModule, MatIconModule, MatSidenavModule,
        MatGridListModule, MatListModule, MatCardModule} from '@angular/material';

@NgModule({
  imports: [

  ],
  declarations: [

  ],
  exports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDialogModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatCardModule
  ]
})
export class SharedModule { }

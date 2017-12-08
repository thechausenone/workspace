import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatToolbarModule, 
        MatTabsModule, MatButtonToggleModule, MatIconModule, MatSidenavModule,
        MatGridListModule, MatListModule, MatCardModule, MatFormFieldModule,
        MatInputModule} from '@angular/material';

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
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ElectronService
      ]
    };
  }
}

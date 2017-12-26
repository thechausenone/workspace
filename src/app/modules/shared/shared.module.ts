import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { AuthenticationService } from '../../modules/login/providers/authentication.service';
import { StateManagerService } from '../../providers/state-manager.service';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatToolbarModule, 
        MatTabsModule, MatButtonToggleModule, MatIconModule, MatSidenavModule,
        MatGridListModule, MatListModule, MatCardModule, MatFormFieldModule,
        MatInputModule, MatTooltipModule, MatSnackBarModule, MatMenuModule, MatSlideToggleModule} from '@angular/material';

@NgModule({
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
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSlideToggleModule
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthenticationService,
        StateManagerService
      ]
    };
  }

 }

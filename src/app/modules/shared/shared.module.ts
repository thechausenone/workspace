import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { AuthenticationService } from '../../modules/login/providers/authentication.service';
import { StateManagerService } from '../../providers/state-manager.service';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { FirebaseConfig } from '../shared/objects/firebase-config.object';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatToolbarModule, 
        MatTabsModule, MatButtonToggleModule, MatIconModule, MatSidenavModule,
        MatGridListModule, MatListModule, MatCardModule, MatFormFieldModule,
        MatInputModule, MatTooltipModule, MatSnackBarModule, MatMenuModule} from '@angular/material';

@NgModule({
  declarations: [

  ],
  imports: [
    AngularFireModule.initializeApp(FirebaseConfig),
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
    MatMenuModule
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

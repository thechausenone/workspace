import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BoardDialogComponent } from './components/board-dialog/board-dialog.component';
import { WindowDialogComponent } from './components/window-dialog/window-dialog.component';
import { BoardSettingsDialogComponent } from './components/board-settings-dialog/board-settings-dialog.component';
import { WindowSettingsDialogComponent } from './components/window-settings-dialog/window-settings-dialog.component';
import { ExitDialogComponent } from './components/exit-dialog/exit-dialog.component';

@NgModule({
  declarations: [
    BoardDialogComponent,
    WindowDialogComponent,
    BoardSettingsDialogComponent,
    WindowSettingsDialogComponent,
    ExitDialogComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    BoardDialogComponent,
    WindowDialogComponent,
    BoardSettingsDialogComponent,
    WindowSettingsDialogComponent,
    ExitDialogComponent
  ],
  entryComponents: [
    BoardDialogComponent,
    WindowDialogComponent,
    BoardSettingsDialogComponent,
    WindowSettingsDialogComponent,
    ExitDialogComponent
  ],
})
export class DialogModule {}

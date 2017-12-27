import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BoardDialogComponent } from './components/board-dialog/board-dialog.component';
import { WindowDialogComponent } from './components/window-dialog/window-dialog.component';
import { BoardSettingsDialogComponent } from './components/board-settings-dialog/board-settings-dialog.component';

@NgModule({
  declarations: [
    BoardDialogComponent,
    WindowDialogComponent,
    BoardSettingsDialogComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    BoardDialogComponent,
    WindowDialogComponent,
    BoardSettingsDialogComponent
  ],
  entryComponents: [
    BoardDialogComponent,
    WindowDialogComponent,
    BoardSettingsDialogComponent
  ],
})
export class DialogModule {}

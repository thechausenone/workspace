import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { routerTransition } from "./app-routing.animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routerTransition ]
})
export class AppComponent {

  constructor(public electronService: ElectronService) {

    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  getHeight():string{
    return (window.innerHeight - 36).toString() + "px";
  };
}

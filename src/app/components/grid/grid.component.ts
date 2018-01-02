import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridsterConfig } from 'angular-gridster2';
import {Window} from './objects/window.object';
import { StateManagerService} from '../../providers/state-manager.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {

  options: GridsterConfig;
  windows: Array<Window>;
  windowSubscription: Subscription;

  static eventStop(item, itemComponent, event) {
    // console.info('eventStop', item, itemComponent, event);
  }

  static itemChange(item, itemComponent) {
    // console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    // console.info('itemResized', item, itemComponent);
  }

  static itemInit(item, itemComponent) {
    // console.info('itemInitialized', item, itemComponent);
  }

  static itemRemoved(item, itemComponent) {
    // console.info('itemRemoved', item, itemComponent);
  }
  
  constructor(private stateManagerService: StateManagerService) { 
    this.windowSubscription = this.stateManagerService.GetWindowsObservable()
                                  .subscribe(data => this.windows = data);
  }

  ngOnInit() {
    this.options = {
      gridType: 'fit',
      compactType: 'none',
      itemChangeCallback: GridComponent.itemChange,
      itemResizeCallback: GridComponent.itemResize,
      itemInitCallback: GridComponent.itemInit,
      itemRemovedCallback: GridComponent.itemRemoved,
      margin: 5,
      outerMargin: true,
      mobileBreakpoint: 640,
      columns: 4,
      rows: 4,
      minCols: 4,
      maxCols: 4,
      minRows: 4,
      maxRows: 4,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 0,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      emptyCellClickCallback: this.emptyCellClick.bind(this),
      emptyCellContextMenuCallback: this.emptyCellClick.bind(this),
      emptyCellDropCallback: this.emptyCellClick.bind(this),
      emptyCellDragCallback: this.emptyCellClick.bind(this),
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      draggable: {
        delayStart: 0,
        enabled: true,
        ignoreContentClass: 'item-body',
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        stop: GridComponent.eventStop
      },
      resizable: {
        delayStart: 0,
        enabled: true,
        stop: GridComponent.eventStop,
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        }
      },
      api: {
        resize: GridComponent.eventStop,
        optionsChanged: GridComponent.eventStop,
        getNextPossiblePosition: GridComponent.eventStop,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: 'onDrag&Resize',
      disableWindowResize: false
    };
  }

  ngOnDestroy(): void {
    // to prevent memory leak when component is destroyed
    this.windowSubscription.unsubscribe();
  }

  emptyCellClick(event, item) {
    // console.info('empty cell click', event, item);
    this.windows.push(item);
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.windows.splice(this.windows.indexOf(item), 1);
  }

  addItem() {
    this.windows.push(new Window());
  }
  

}

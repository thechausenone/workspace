import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowSettingsDialogComponent } from './window-settings-dialog.component';

describe('WindowSettingsDialogComponent', () => {
  let component: WindowSettingsDialogComponent;
  let fixture: ComponentFixture<WindowSettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowSettingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

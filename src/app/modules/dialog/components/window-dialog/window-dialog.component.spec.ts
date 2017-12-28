import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowDialogComponent } from './window-dialog.component';

describe('WindowDialogComponent', () => {
  let component: WindowDialogComponent;
  let fixture: ComponentFixture<WindowDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSettingsDialogComponent } from './board-settings-dialog.component';

describe('BoardSettingsDialogComponent', () => {
  let component: BoardSettingsDialogComponent;
  let fixture: ComponentFixture<BoardSettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardSettingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

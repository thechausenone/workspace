import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCreationComponent } from './board-creation.component';

describe('BoardCreationComponent', () => {
  let component: BoardCreationComponent;
  let fixture: ComponentFixture<BoardCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

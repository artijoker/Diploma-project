import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentModalWindowComponent } from './comment-modal-window.component';

describe('CommentDetailsModalWindowComponent', () => {
  let component: CommentModalWindowComponent;
  let fixture: ComponentFixture<CommentModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentModalWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

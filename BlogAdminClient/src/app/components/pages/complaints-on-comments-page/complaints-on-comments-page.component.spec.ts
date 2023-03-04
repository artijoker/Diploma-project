import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsOnCommentsPageComponent } from './complaints-on-comments-page.component';

describe('ComplaintsOnCommentsComponent', () => {
  let component: ComplaintsOnCommentsPageComponent;
  let fixture: ComponentFixture<ComplaintsOnCommentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsOnCommentsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintsOnCommentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsOnPostsPageComponent } from './complaints-on-posts-page.component';

describe('ComplaintsOnPostsComponent', () => {
  let component: ComplaintsOnPostsPageComponent;
  let fixture: ComponentFixture<ComplaintsOnPostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsOnPostsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintsOnPostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

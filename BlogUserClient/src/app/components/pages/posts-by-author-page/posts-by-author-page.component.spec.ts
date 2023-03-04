import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsByAuthorPageComponent } from './posts-by-author-page.component';

describe('PostsByAuthorPageComponent', () => {
  let component: PostsByAuthorPageComponent;
  let fixture: ComponentFixture<PostsByAuthorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsByAuthorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsByAuthorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

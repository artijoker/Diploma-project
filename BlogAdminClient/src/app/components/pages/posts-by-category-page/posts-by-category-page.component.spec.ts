import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsByCategoryPageComponent } from './posts-by-category-page.component';

describe('PostsByCategoryPageComponent', () => {
  let component: PostsByCategoryPageComponent;
  let fixture: ComponentFixture<PostsByCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsByCategoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsByCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsFromTrashPageComponent } from './posts-from-trash-page.component';

describe('PostsFromTrashPageComponent', () => {
  let component: PostsFromTrashPageComponent;
  let fixture: ComponentFixture<PostsFromTrashPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsFromTrashPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsFromTrashPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

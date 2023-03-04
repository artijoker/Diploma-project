import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLikedPostsPageComponent } from './profile-liked-posts-page.component';

describe('ProfileLikedPostsPageComponent', () => {
  let component: ProfileLikedPostsPageComponent;
  let fixture: ComponentFixture<ProfileLikedPostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileLikedPostsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileLikedPostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

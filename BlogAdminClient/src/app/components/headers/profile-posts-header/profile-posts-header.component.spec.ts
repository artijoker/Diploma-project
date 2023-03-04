import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostsHeaderComponent } from './profile-posts-header.component';

describe('ProfilePostsHeaderComponent', () => {
  let component: ProfilePostsHeaderComponent;
  let fixture: ComponentFixture<ProfilePostsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePostsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePostsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

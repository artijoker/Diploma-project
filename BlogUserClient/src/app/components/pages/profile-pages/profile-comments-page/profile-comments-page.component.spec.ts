import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCommentsPageComponent } from './profile-comments-page.component';

describe('ProfileCommentsPageComponent', () => {
  let component: ProfileCommentsPageComponent;
  let fixture: ComponentFixture<ProfileCommentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCommentsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCommentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

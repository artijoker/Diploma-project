import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSubscriptionsPageComponent } from './profile-subscriptions-page.component';

describe('ProfileSubscriptionsPageComponent', () => {
  let component: ProfileSubscriptionsPageComponent;
  let fixture: ComponentFixture<ProfileSubscriptionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSubscriptionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSubscriptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

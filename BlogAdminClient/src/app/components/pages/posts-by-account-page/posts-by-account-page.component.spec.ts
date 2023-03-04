import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsByAccountPageComponent } from './posts-by-account-page.component';

describe('PostsByAccountPageComponent', () => {
  let component: PostsByAccountPageComponent;
  let fixture: ComponentFixture<PostsByAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsByAccountPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsByAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

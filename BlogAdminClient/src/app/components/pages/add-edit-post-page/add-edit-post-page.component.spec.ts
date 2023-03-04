import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPostPageComponent } from './add-edit-post-page.component';

describe('AddEditPostPageComponent', () => {
  let component: AddEditPostPageComponent;
  let fixture: ComponentFixture<AddEditPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPostPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

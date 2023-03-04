import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAccountModalWindowComponent } from './add-edit-account-modal-window.component';

describe('AddEditAccountComponent', () => {
  let component: AddEditAccountModalWindowComponent;
  let fixture: ComponentFixture<AddEditAccountModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAccountModalWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAccountModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

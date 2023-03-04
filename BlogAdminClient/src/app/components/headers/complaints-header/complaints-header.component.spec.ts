import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsHeaderComponent } from './complaints-header.component';

describe('ComplaintsHeaderComponent', () => {
  let component: ComplaintsHeaderComponent;
  let fixture: ComponentFixture<ComplaintsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

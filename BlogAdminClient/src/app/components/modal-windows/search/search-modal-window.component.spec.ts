import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchModalWindowComponent } from './search-modal-window.component';

describe('SearchComponent', () => {
  let component: SearchModalWindowComponent;
  let fixture: ComponentFixture<SearchModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchModalWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

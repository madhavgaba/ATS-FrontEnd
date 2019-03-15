import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListinterviewersComponent } from './listinterviewers.component';

describe('ListinterviewersComponent', () => {
  let component: ListinterviewersComponent;
  let fixture: ComponentFixture<ListinterviewersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListinterviewersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListinterviewersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

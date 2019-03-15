import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigninterviewerComponent } from './assigninterviewer.component';

describe('AssigninterviewerComponent', () => {
  let component: AssigninterviewerComponent;
  let fixture: ComponentFixture<AssigninterviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigninterviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigninterviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

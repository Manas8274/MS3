import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByIdStudentComponent } from './view-by-id-student.component';

describe('ViewByIdStudentComponent', () => {
  let component: ViewByIdStudentComponent;
  let fixture: ComponentFixture<ViewByIdStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewByIdStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewByIdStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

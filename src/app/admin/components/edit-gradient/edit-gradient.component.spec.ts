import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGradientComponent } from './edit-gradient.component';

describe('EditGradientComponent', () => {
  let component: EditGradientComponent;
  let fixture: ComponentFixture<EditGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGradientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

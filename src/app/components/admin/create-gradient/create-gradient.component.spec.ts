import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGradientComponent } from './create-gradient.component';

describe('CreateGradientComponent', () => {
  let component: CreateGradientComponent;
  let fixture: ComponentFixture<CreateGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGradientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

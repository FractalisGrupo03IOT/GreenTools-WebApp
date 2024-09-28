import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPotInputComponent } from './add-pot-input.component';

describe('AddPotInputComponent', () => {
  let component: AddPotInputComponent;
  let fixture: ComponentFixture<AddPotInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPotInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPotInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

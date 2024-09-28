import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPlantsComponent } from './crop-plants.component';

describe('CropPlantsComponent', () => {
  let component: CropPlantsComponent;
  let fixture: ComponentFixture<CropPlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropPlantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

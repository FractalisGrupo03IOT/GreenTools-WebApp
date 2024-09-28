import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCropComponent } from './data-crop.component';

describe('DataCropComponent', () => {
  let component: DataCropComponent;
  let fixture: ComponentFixture<DataCropComponent>; 

  beforeEach(async () => { 
    await TestBed.configureTestingModule({ 
      imports: [DataCropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

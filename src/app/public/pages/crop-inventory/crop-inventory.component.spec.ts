import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropInventoryComponent } from './crop-inventory.component';

describe('CropInventoryComponent', () => {
  let component: CropInventoryComponent;
  let fixture: ComponentFixture<CropInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

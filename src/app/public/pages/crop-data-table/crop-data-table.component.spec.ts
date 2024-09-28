import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropDataTableComponent } from './crop-data-table.component';

describe('CropDataTableComponent', () => {
  let component: CropDataTableComponent;
  let fixture: ComponentFixture<CropDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerpotsListComponent } from './flowerpots-list.component';

describe('FlowerpotsListComponent', () => {
  let component: FlowerpotsListComponent;
  let fixture: ComponentFixture<FlowerpotsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowerpotsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowerpotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

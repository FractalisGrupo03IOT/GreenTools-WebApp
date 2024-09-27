import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFlowerpotsComponent } from './my-flowerpots.component';

describe('MyFlowerpotsComponent', () => {
  let component: MyFlowerpotsComponent;
  let fixture: ComponentFixture<MyFlowerpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFlowerpotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFlowerpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasswordConfirmationComponent } from './recover-password-confirmation.component';

describe('RecoverPasswordConfirmationComponent', () => {
  let component: RecoverPasswordConfirmationComponent;
  let fixture: ComponentFixture<RecoverPasswordConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverPasswordConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverPasswordConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

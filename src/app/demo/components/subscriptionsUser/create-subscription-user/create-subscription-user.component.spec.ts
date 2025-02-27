import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubscriptionUserComponent } from './create-subscription-user.component';

describe('CreateSubscriptionComponent', () => {
  let component: CreateSubscriptionUserComponent;
  let fixture: ComponentFixture<CreateSubscriptionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubscriptionUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubscriptionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
